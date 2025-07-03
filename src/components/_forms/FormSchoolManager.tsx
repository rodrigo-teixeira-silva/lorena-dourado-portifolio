"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import InputMask from "@/components/InputMask";
import { Button } from "@/components/Button";
import api from "@/app/api/axios";
import { isAxiosError } from "axios";
// import { useRouter } from "next/navigation";

function formatDateToDashed(dateStr: string) {
  const [day, month, year] = dateStr.split("/");
  if (!day || !month || !year) return "";
  return `${year}-${month}-${day}`;
}

async function registerPedagogicalCoordination(formData: {
  name: string;
  email: string;
  cpf: string;
  id_escola: number;
  dataNascimento: string;
  endereco: string;
  numero: string;
  telefone: string;
  nomeEscola: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  contactType: string;
  status: string;
}) {
  const formattedBirthDate = formatDateToDashed(formData.dataNascimento);

  const fullAddress = `Rua ${formData.endereco}, Número ${formData.numero}, Bairro ${formData.bairro}, ${formData.cidade} - ${formData.estado}, CEP: ${formData.cep}`;

  const payload = {
    fullName: formData.name,
    email: formData.email,
    documentId: formData.cpf.replace(/\D/g, ""),
    birthDate: formattedBirthDate,
    address: fullAddress,
    phone: formData.telefone.replace(/\D/g, ""),
    schoolId: formData.id_escola,
    schoolName: formData.nomeEscola,
    contactType: formData.contactType,
    status: formData.status,
  };

  console.log("Enviando payload para API:", payload);

  try {
    const response = await api.post("/contacts", payload);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Erro ao cadastrar:", error.response?.data || error.message);
    } else {
      console.error("Erro ao cadastrar:", error);
    }
    throw error;
  }
}

type Gestor = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  dataNascimento: string;
  status: string;
};

type FormSchoolManagerProps = {
  onSuccess?: (novoGestor: Omit<Gestor, "id">) => void;
  onCancel?: () => void;
  schoolId: number | null;
  schoolName: string;
};

export default function FormSchoolManager({ onSuccess, schoolId }: FormSchoolManagerProps) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    endereco: "",
    id_escola: schoolId || 0,
    numero: "",
    telefone: "",
    nomeEscola: "",
    contactType: "FUNCIONARIO",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    dataNascimento: "",
    status: "ATIVO",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "id_escola") {
      setFormData((prevData) => ({ ...prevData, [name]: Number(value) || 0 }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cpf, name, email, telefone, dataNascimento,  } = formData;

    if (!cpf || !name || !email || !telefone || !dataNascimento ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);

    try {
      const response = await registerPedagogicalCoordination(formData);
    
      

if (response.status === 201 || response.status === 200) {
  alert("Gestor cadastrado com sucesso!");
  onSuccess?.({
    name: formData.name,
    email: formData.email,
    cpf: formData.cpf,
    endereco: formData.endereco,
    telefone: formData.telefone,
    dataNascimento: formData.dataNascimento,
    status: formData.status,
  });
}

      else {
        alert("Erro ao cadastrar Gestor!");
      }
    } catch (error) {
      let errorMessage = "Erro ao enviar os dados para o servidor.";
      if (error instanceof Error) {
        errorMessage += ` Detalhes: ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage += ` ${error}`;
      }
      console.error("Erro no cadastro:", error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("schoolId");
    const savedName = localStorage.getItem("schoolName");
    const savedManager = localStorage.getItem("schoolManagerName");

    if (savedId || savedName || savedManager) {
      setFormData((prevData) => ({
        ...prevData,
        id_escola: savedId ? Number(savedId) : schoolId || 0,
        nomeEscola: savedName || "",
        name: savedManager || "",
      }));
    }
  }, [schoolId]);

  useEffect(() => {
    if (formData.id_escola) {
      const fetchSchoolName = async () => {
        try {
          const response = await api.get(`/accounts/${formData.id_escola}`);
          const accountName = response.data.data?.accountName;
          if (accountName) {
            setFormData((prev) => ({ ...prev, nomeEscola: accountName }));
          }
        } catch (error) {
          console.error("Erro ao buscar nome da escola:", error);
        }
      };
      fetchSchoolName();
    }
  }, [formData.id_escola]);

 
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* nome */}
      <div>
        <label className="text-base font-medium text-black">
          Nome <span className="text-red-500">*</span>
        </label>
        <Input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Digite o nome completo"  />
      </div>

      {/* campos 3 colunas */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-base font-medium text-black">
            CPF <span className="text-red-500">*</span>
          </label>
          <InputMask name="cpf" value={formData.cpf} onChange={handleChange} mask="000.000.000-00" placeholder="CPF" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Data de Nascimento <span className="text-red-500">*</span>
          </label>
          <InputMask name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} mask="00/00/0000" placeholder="Data Nascimento" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Celular <span className="text-red-500">*</span>
          </label>
          <InputMask name="telefone" value={formData.telefone} onChange={handleChange} mask="(00) 00000-0000" placeholder="Celular" required />
        </div>
      </div>

      {/* endereço */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-base font-medium text-black">
            CEP <span className="text-red-500">*</span>
          </label>
          <InputMask name="cep" value={formData.cep} onChange={handleChange} mask="00000-000" placeholder="CEP" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Cidade <span className="text-red-500">*</span>
          </label>
          <Input name="cidade" value={formData.cidade} onChange={handleChange} type="text" placeholder="Cidade" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Estado <span className="text-red-500">*</span>
          </label>
          <Input name="estado" value={formData.estado} onChange={handleChange} type="text" placeholder="Estado" required />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-base font-medium text-black">
            Rua <span className="text-red-500">*</span>
          </label>
          <Input name="endereco" value={formData.endereco} onChange={handleChange} type="text" placeholder="Rua" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Bairro <span className="text-red-500">*</span>
          </label>
          <Input name="bairro" value={formData.bairro} onChange={handleChange} type="text" placeholder="Bairro" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Número <span className="text-red-500">*</span>
          </label>
          <Input name="numero" value={formData.numero} onChange={handleChange} type="text" placeholder="Número" required />
        </div>
      </div>

      {/* email e status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-base font-medium text-black">
            Email <span className="text-red-500">*</span>
          </label>
          <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
        </div>
        <div>
          <label className="text-base font-medium text-black">
            Status <span className="text-red-500">*</span>
          </label>
          <Input name="status" value={formData.status} onChange={handleChange} type="text" placeholder="Status" required />
        </div>
      </div>

      {/* nome escola */}
      <div>
        <label className="text-base font-medium text-black">
          Nome da Escola
        </label>
        <Input name="nomeEscola" value={formData.nomeEscola} onChange={handleChange} type="text" placeholder="Nome da Escola" disabled />
      </div>

      <input type="hidden" name="contactType" value={formData.contactType} />

      <div className="flex justify-end mt-6">
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-[114px] h" 
      >
        {loading ? "Carregando..." : "Cadastrar"}
      </Button>
    </div>
    
    </form>
  );

}
