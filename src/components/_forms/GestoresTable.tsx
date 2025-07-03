// components/_tables/GestoresTable.tsx
import { PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/app/api/axios";
import { AxiosError } from "axios";
import { useState } from "react";

type Gestor = {
  id: number;
  nome: string;
  email: string;
  status: string;
  escolaNome: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
};

type GestoresTableProps = {
  gestores: Gestor[];
  onDelete: (id: number) => void;
  onEdit: (gestor: Gestor) => void;
};

export default function GestoresTable({ gestores, onDelete, onEdit }: GestoresTableProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      const response = await api.delete(`/contacts/${id}`);
      
      if (response.status === 200 || response.status === 204) {
        onDelete(id);
        toast.success("Gestor removido com sucesso!");
      } else {
        throw new Error(`Resposta inesperada: ${response.status}`);
      }
    } catch (error: unknown) {
      console.error("Erro detalhado:", error);
      
      let errorMessage = "Erro ao remover gestor";
      
      if (error instanceof AxiosError && error.response) {
        const serverError = error as unknown as { response: { data: { errors?: { description?: string }[]; mensage?: string } } };
        if (serverError.response.data?.errors?.length ?? 0 > 0) {
          errorMessage = serverError.response.data.errors?.[0]?.description || errorMessage;
        } else if (serverError.response.data?.mensage) {
          errorMessage = serverError.response.data.mensage;
        }
      } else if ((error as AxiosError)?.request) {
        errorMessage = "Sem resposta do servidor - verifique sua conexão";
      } else {
        errorMessage = (error as Error).message || errorMessage;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-50">
          <tr className="text-[#62748E]">
            <th className="py-3 px-6 border-b border-[#E2E8F0] font-medium">Nome</th>
            <th className="py-3 px-6 border-b border-[#E2E8F0] font-medium">E-mail</th>
            <th className="py-3 px-6 border-b border-[#E2E8F0] font-medium">Escola</th>
            <th className="py-3 px-6 border-b border-[#E2E8F0] font-medium">Status</th>
            <th className="py-3 px-6 border-b border-[#E2E8F0] font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {gestores.length > 0 ? (
            gestores.map((gestor) => (
              <tr key={gestor.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b border-[#E2E8F0]">{gestor.nome}</td>
                <td className="py-4 px-6 border-b border-[#E2E8F0]">{gestor.email}</td>
                <td className="py-4 px-6 border-b border-[#E2E8F0]">{gestor.escolaNome}</td>
                <td className="py-4 px-6 border-b border-[#E2E8F0]">
                <span
  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
    gestor.status.toUpperCase() === "ATIVO"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {gestor.status}
</span>
                </td>
                <td className="py-4 px-6 border-b border-[#E2E8F0] text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => onEdit(gestor)} // Passando o objeto gestor completo
                      disabled={loadingId === gestor.id}
                      className={`text-blue-600 hover:text-blue-900 transition-colors ${
                        loadingId === gestor.id ? "opacity-50" : ""
                      }`}
                      title="Editar gestor"
                    >
                      {loadingId === gestor.id ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        <PencilLine size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja remover ${gestor.nome}?`)) {
                          handleDelete(gestor.id);
                        }
                      }}
                      disabled={loadingId === gestor.id}
                      className={`text-red-600 hover:text-red-900 transition-colors ${
                        loadingId === gestor.id ? "opacity-50" : ""
                      }`}
                      title="Remover gestor"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                Nenhum gestor encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}