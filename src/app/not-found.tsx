import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-lg text-gray-600">Página não encontrada</p>
            <p className="mt-2 text-gray-500">Desculpe, você não tem permissão para acessar essa pagina.</p>
        <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Voltar para a página inicial
        </Link>
        
        </div>
    );
  }