"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/Button";
import { toast } from "react-hot-toast";
import api from "@/app/api/axios";
import axios from "axios";

interface DeleteSchoolButtonProps {
  accountId: number;
  onSuccess: (accountId: number) => void;
}

export const DeleteSchoolButton = ({ accountId, onSuccess }: DeleteSchoolButtonProps) => {
  const handleDelete = async () => {
    try {
      const confirmacao = window.confirm("Tem certeza que deseja deletar esta escola?");
      if (!confirmacao) return;

      // Adicionando tratamento especial para o erro 500
      try {
        const response = await api.delete(`/accounts/${accountId}`, {
          validateStatus: (status) => status < 500 // Não lançar erro para status 500
        });

        // Verificar se a resposta é um erro 500
        if (response.status === 500) {
          throw new Error("Servidor encontrou um erro interno");
        }

        // Sucesso (200-299) ou No Content (204)
        if (response.status >= 200 && response.status < 300) {
          onSuccess(accountId);
          toast.success("Escola deletada com sucesso!");
          return;
        }

        // Outros status (como 400, 404, etc)
        throw new Error(`Status inesperado: ${response.status}`);

      } catch (error) {
        // Tentar uma abordagem alternativa se for erro 500
        if (axios.isAxiosError(error) && error.response?.status === 500) {
          await tryAlternativeApproach(accountId);
          return;
        }
        throw error; // Re-lançar outros erros
      }

    } catch (error) {
      console.error("Erro ao deletar escola:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  // Abordagem alternativa para quando o DELETE direto falha
  const tryAlternativeApproach = async (id: number) => {
    try {
      // Tentativa 1: PATCH para marcar como inativo
      try {
        const response = await api.patch(`/accounts/${id}`, { 
          status: "INACTIVE" 
        });
        
        if (response.status === 200) {
          toast.success("Escola marcada como inativa (não foi possível deletar)");
          onSuccess(id); // Você pode querer ajustar isso dependendo da sua lógica
          return;
        }
      } catch (patchError) {
        console.warn("Falha ao marcar como inativo:", patchError);
      }

      throw new Error("Não foi possível deletar nem desativar a escola");
    } catch (finalError) {
      throw finalError;
    }
  };

  // Helper para mensagens de erro
  const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data?.message || 
              "Erro no servidor ao processar a requisição";
      }
      return error.message || "Erro de comunicação com o servidor";
    }
    return "Ocorreu um erro inesperado";
  };

  return (
    <Button
      onClick={handleDelete}
      className="bg-ghost text-[#1C398E] py-1 px-4 rounded hover:bg-[#F5F5F5] transition"
    >
      <Trash />
    </Button>
  );
};