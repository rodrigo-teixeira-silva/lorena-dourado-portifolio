import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Interface do usuário dentro da sessão
interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken?: string;
  roles?: string[];
}

// Estendendo o módulo next-auth
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      roles?: string[];
    };
  }
}

// Função para decodificar o JWT manualmente
function decodeJWT(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
  console.log("Decoded JWT:", jsonPayload);
}

// Configuração principal do NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Keycloak",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "password",
              client_id: process.env.KEYCLOAK_CLIENT_ID!,
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
              username: credentials?.username || "",
              password: credentials?.password || "",
            }),
          }
        );
        const data = await res.json();
        if (res.ok && data.access_token) {
          return {
            id: "user",
            name: credentials?.username,
            accessToken: data.access_token,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;

        const decoded = decodeJWT(user.accessToken ?? "");
        token.roles = decoded.realm_access?.roles || [];
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;

      session.user = {
        ...(token.user as SessionUser),
        roles: token.roles as string[] | undefined,
      };

      return session;
    },
  },
};
