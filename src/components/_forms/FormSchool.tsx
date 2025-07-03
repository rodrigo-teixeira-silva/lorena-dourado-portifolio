"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import api from "@/app/api/axios";
import InputMask from "../InputMask";

interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Escola {
  accountId: number;
  accountName: string;
  email: string;
  status: string;
  address?: string | Endereco;
  gestor?: string;
}

interface FormSchoolProps {
  onSuccess: (novaEscola: Escola) => void;
  escolaExistente?: Escola | null;
  schoolToEdit?: Escola;
}

export default function FormSchool({
  onSuccess,
  escolaExistente,
  schoolToEdit,
}: FormSchoolProps) {
  const escolaParaEditar = escolaExistente || schoolToEdit;
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nomeEscola: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    gestor: "",
    status: "ATIVO",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      if (escolaParaEditar?.accountId) {
        try {
          let addressData = escolaParaEditar.address;
          
          // Handle case where address might be a string
          if (typeof addressData === 'string') {
            try {
              addressData = JSON.parse(addressData);
            } catch {
              addressData = undefined;
            }
          }

          setFormData({
            nomeEscola: escolaParaEditar.accountName || "",
            endereco: (addressData as Endereco)?.logradouro || "",
            numero: (addressData as Endereco)?.numero || "",
            bairro: (addressData as Endereco)?.bairro || "",
            cidade: (addressData as Endereco)?.cidade || "",
            estado: (addressData as Endereco)?.estado || "",
            cep: (addressData as Endereco)?.cep || "",
            gestor: escolaParaEditar.gestor || "",
            status: escolaParaEditar.status || "ATIVO",
            email: escolaParaEditar.email || "",
          });
        } catch (error) {
          console.error("Erro ao buscar dados da escola:", error);
          alert("Erro ao carregar os dados da escola para edição.");
        }
      }
    };

    fetchSchoolDetails();
  }, [escolaParaEditar]);

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatCEP = (cep: string) => {
    const digits = cep.replace(/\D/g, '');
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5, 8)}` : digits;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cep") {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 8) return;
      const formattedCEP = formatCEP(digitsOnly);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedCEP,
      }));
      return;
    }

    const capitalizedValue =
      name === "email" || name === "numero"
        ? value
        : capitalizeFirstLetter(value);

    if (name === "numero" && !/^\d*$/.test(value)) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: capitalizedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomeEscola || !formData.endereco || !formData.email) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);

    const addressString = JSON.stringify({
      logradouro: formData.endereco,
      numero: formData.numero,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      cep: formData.cep.replace(/\D/g, ''),
    });

    try {
      if (escolaParaEditar) {
        const response = await api.put(`/accounts/${escolaParaEditar.accountId}`, {
          accountName: formData.nomeEscola,
          email: formData.email,
          status: formData.status,
          address: addressString,
          gestor: formData.gestor,
        });

        if (response.status === 200) {
          alert("Escola atualizada com sucesso!");
          localStorage.setItem("schoolId", String(escolaParaEditar.accountId));
          localStorage.setItem("schoolName", formData.nomeEscola);
          localStorage.setItem("schoolManagerName", formData.gestor);
          localStorage.setItem("schoolAddress", addressString);
          
          onSuccess({
            accountId: escolaParaEditar.accountId,
            accountName: formData.nomeEscola,
            email: formData.email,
            status: formData.status,
            address: addressString,
            gestor: formData.gestor
          });
        } else {
          alert("Erro ao atualizar escola!");
        }
      } else {
        const response = await api.post("/accounts", {
          accountName: formData.nomeEscola,
          email: formData.email,
          status: formData.status,
          address: addressString,
          gestor: formData.gestor,
        });

        if (response.status === 201) {
          const generatedId = response.data.data.accountId;
          localStorage.setItem("schoolId", String(generatedId));
          localStorage.setItem("schoolName", formData.nomeEscola);
          localStorage.setItem("schoolManagerName", formData.gestor);
          localStorage.setItem("schoolAddress", addressString);
          setCadastroSucesso(true);
          alert(`Escola cadastrada com sucesso! ID: ${generatedId}`);
          
          onSuccess({
            accountId: generatedId,
            accountName: formData.nomeEscola,
            email: formData.email,
            status: formData.status,
            address: addressString,
            gestor: formData.gestor
          });
        } else {
          alert("Erro ao cadastrar escola!");
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados para o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const LabelWithAsterisk = ({ children }: { children: React.ReactNode }) => (
    <p className="text-black font-medium mb-1">
      {children} <span className="text-red-600">*</span>
    </p>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-0">
      <div className="mt-8 flex justify-center">
        <div className="rounded-2xl w-full border-1 border-[#E2E8F0] max-w-8xl mx-auto bg-white
         dark:bg-gray-800 p-6 max-h-[91vh] overflow-y-auto">
          
          <LabelWithAsterisk>Razão Social</LabelWithAsterisk>
          <Input
            type="text"
            placeholder="Ex: Escola de Ensino Fundamental e Médio São José."
            name="nomeEscola"
            value={formData.nomeEscola}
            onChange={handleChange}
            required
          />

          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <LabelWithAsterisk>CEP</LabelWithAsterisk>
              <InputMask
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="69000-000"
                mask="00000-000"
                required
                inputMode="numeric"
              />
            </div>
            <div className="flex-1">
              <LabelWithAsterisk>Cidade</LabelWithAsterisk>
              <Input
                type="text"
                placeholder="Ex: Manaus"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <LabelWithAsterisk>Estado</LabelWithAsterisk>
              <Input
                type="text"
                placeholder="Ex: Amazonas"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <LabelWithAsterisk>Endereço</LabelWithAsterisk>
              <Input
                type="text"
                placeholder="Ex: Rua das Flores"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <LabelWithAsterisk>Bairro</LabelWithAsterisk>
              <Input
                type="text"
                placeholder="Ex: Centro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <LabelWithAsterisk>Número</LabelWithAsterisk>
              <Input
                type="text"
                placeholder="Ex: 304"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <div className="flex-[2]">
              <LabelWithAsterisk>Email da Escola</LabelWithAsterisk>
              <Input
                type="email"
                placeholder="Ex: escola@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-[1]">
              <LabelWithAsterisk>Status da Escola</LabelWithAsterisk>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-black"
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
              </select>
            </div>
          </div>

          {(escolaParaEditar || !cadastroSucesso) && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#155DFC] text-white text-sm py-2 px-4 rounded hover:bg-[#0d4ac1] transition-colors"
              >
                {loading
                  ? "Salvando..."
                  : escolaParaEditar
                  ? "Atualizar Escola"
                  : "Cadastrar Escola"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}