"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";
import ModalFormEditSchoolManager from "@/components/_forms/ModalFormEditSchoolManager";

interface Gestor {
  id: number;
  nome: string;
  email: string;
  status: string;
}

interface GestorManagerProps {
  schoolId: number | null;
}

export default function GestorManager({ schoolId }: GestorManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarModalGestor, setMostrarModalGestor] = useState(false);
  
  // Dados mockados - substitua por chamada à API
  const [gestores] = useState<Gestor[]>([
    { id: 1, nome: "Gestor Exemplo", email: "gestor@escola.com", status: "Ativo" }
  ]);

  const gestoresFiltrados = gestores.filter(gestor =>
    gestor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gestor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-8 gap-4 flex flex-col">
      <div className="text-2xl font-bold text-[#0F172B]">
        Dados do gestor
      </div>

      {/* Campo de busca */}
      <div className="relative w-full mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
          outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabela de gestores */}
      <table className="min-w-full bg-white text-left">
        <thead>
          <tr className="text-[#62748E]">
            <th className="py-2 px-6 border-b border-[#E2E8F0]">Nome</th>
            <th className="py-2 px-6 border-b border-[#E2E8F0]">Email</th>
            <th className="py-2 px-6 border-b border-[#E2E8F0]">Status</th>
            <th className="py-2 px-6 border-b border-[#E2E8F0] w-40 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {gestoresFiltrados.map((gestor) => (
            <tr key={gestor.id} className="text-gray-800">
              <td className="py-2 px-6 border-b border-[#E2E8F0]">{gestor.nome}</td>
              <td className="py-2 px-6 border-b border-[#E2E8F0]">{gestor.email}</td>
              <td className="py-2 px-6 border-b border-[#E2E8F0]">{gestor.status}</td>
              <td className="py-2 px-6 border-b border-[#E2E8F0] text-right w-40 h-full">
                <div className="flex justify-end items-center h-full">
                  <Eye 
                    color="#155DFC" 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setMostrarModalGestor(true)}



                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal de edição */}
      {mostrarModalGestor && (
        <ModalFormEditSchoolManager
          isOpen={mostrarModalGestor} 
          onClose={() => setMostrarModalGestor(false)}
          schoolId={schoolId}
        />
      )}
    </div>
  );
}