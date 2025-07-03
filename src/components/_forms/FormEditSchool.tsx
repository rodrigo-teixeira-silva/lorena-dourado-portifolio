"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { useParams } from "next/navigation";
import InputMask from "@/components/InputMask";
import api from "@/app/api/axios";
import { useSchoolContext } from "@/contexts/SchoolContext";

interface FormSchoolProps {
  onSuccess: () => void;
  schoolToEdit?: {
    accountId: number;
    accountName: string;
    email: string;
    status: string;
    address: string;
  };
}

interface AddressFields {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function FormEditSchool({ onSuccess, schoolToEdit }: FormSchoolProps) {
  const params = useParams();
  const schoolId = params?.id;
  const { selectedSchoolId, setSelectedSchoolId } = useSchoolContext();

  const [formData, setFormData] = useState({
    accountId: 0,
    accountName: "",
    status: "ATIVO",
    email: "",
  });

  const [addressFields, setAddressFields] = useState<AddressFields>({
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  
  useEffect(() => {
    if (schoolId) {
      setSearchTerm(String(schoolId));
      setSelectedSchoolId(Number(schoolId));
    } else if (selectedSchoolId) {
      setSearchTerm(String(selectedSchoolId));
    }
  }, [schoolId, selectedSchoolId, setSelectedSchoolId]);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchTerm.trim()) {
      setSearchLoading(true);
      const timeout = setTimeout(() => {
        fetchSchoolData(searchTerm);
      }, 800);

      setTypingTimeout(timeout);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchTerm]);

  
  useEffect(() => {
    if (schoolToEdit?.accountId) {
      fetchSchoolData(String(schoolToEdit.accountId));
    }
  }, [schoolToEdit]);

  const fetchSchoolData = async (id: string) => {
    try {
      const response = await api.get(`/accounts/${id}`);
      const data = response.data?.data?.[0];

      if (data) {
        setFormData({
          accountId: data.accountId || 0,
          accountName: data.accountName || "",
          status: data.status || "ATIVO",
          email: data.email || "",
        });

        try {
          const parsed = JSON.parse(data.address);
          setAddressFields({
            logradouro: parsed.logradouro || "",
            numero: parsed.numero || "",
            bairro: parsed.bairro || "",
            cidade: parsed.cidade || "",
            estado: parsed.estado || "",
            cep: parsed.cep || "",
          });
        } catch (err) {
          console.warn("Endereço não está em formato JSON:", err);
        }
        
        setSelectedSchoolId(data.accountId);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da escola:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (name in addressFields) {
      setAddressFields((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.accountName || !formData.email) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const payload = {
      accountName: formData.accountName,
      email: formData.email,
      status: formData.status,
      address: JSON.stringify(addressFields),
    };

    setLoading(true);

    try {
      if (formData.accountId > 0) {
        await api.put(`/accounts/${formData.accountId}`, payload);
        setSelectedSchoolId(formData.accountId);
        alert("Escola atualizada com sucesso!");
      } else {
        const response = await api.post("/accounts", payload);
        setSelectedSchoolId(response.data.id);
        alert("Escola cadastrada com sucesso!");
      }

      onSuccess();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-7xl  mx-auto p-6 ">
      <div className="mb-4">        
        <p className="text-base font-medium text-[#155DFC]">ID da Escola</p>
        <div className="mt-2 mb-8 h-12">
          <Input
            type="text"
            placeholder="Digite o ID da escola"
            name="searchTerm"
            value={searchTerm}
            onChange={handleChange}
          />
          {searchLoading && (
            <p className="text-sm text-blue-500 mt-[-12]">Buscando escola...</p>
          )}
        </div>
      </div>

      <p className="text-base font-medium text-[#155DFC] mt-4">Nome da Escola</p>
      <Input
        type="text"
        placeholder="Ex: Escola João Silva"
        name="accountName"
        value={formData.accountName}
        onChange={handleChange}
        required
      />

      <p className="text-base font-medium text-[#155DFC] mt-4">Endereço</p>
      <Input
        type="text"
        placeholder="Ex: Rua das Flores"
        name="logradouro"
        value={addressFields.logradouro}
        onChange={handleChange}
        required
      />

      <div className="flex space-x-4 mt-4">
        <div className="flex-1">
          <p className="text-base font-medium text-[#155DFC] mb-2">Número</p>
          <Input
            type="text"
            placeholder="Ex: 304"
            name="numero"
            value={addressFields.numero}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="flex-1">
          <p className="text-base font-medium text-[#155DFC] mb-2">Bairro</p>
          <Input
            type="text"
            placeholder="Ex: Centro"
            name="bairro"
            value={addressFields.bairro}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-1">
        <div className="flex-1">
          <p className="text-base font-medium text-[#155DFC] mb-2">Cidade</p>
          <Input
            type="text"
            placeholder="Ex: Manaus"
            name="cidade"
            value={addressFields.cidade}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <p className="text-base font-medium text-[#155DFC] mb-2">Estado</p>
          <Input
            type="text"
            placeholder="Ex: Amazonas"
            name="estado"
            value={addressFields.estado}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <InputMask
          name="cep"
          label="CEP"
          placeholder="00000-000"
          mask="00000-000"
          value={addressFields.cep}
          onChange={handleChange}
          required
        />
      </div>

      <p className="text-base font-medium text-[#155DFC] mt-4">Email da Escola</p>
      <Input
        type="email"
        placeholder="Ex: escola@example.com"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className="mt-4">
        <label className="text-base font-medium text-[#155DFC]">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="block w-full border border-gray-300 p-2 rounded mt-1"
        >
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      <Button type="submit" className="mt-6" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}