import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      roles?: string[];
    };
  }

  interface User extends DefaultUser {
    roles?: string[];
  }
}
