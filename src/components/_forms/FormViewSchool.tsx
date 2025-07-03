"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";

import api from "@/app/api/axios";
import { useSchoolContext } from "@/contexts/SchoolContext";

interface AddressFields {
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
  address?: string | AddressFields;
}

interface FormSchoolProps {
  schoolId?: number | null;
  schoolData?: Escola | null;
}

export default function FormViewSchool({
  schoolId,
  schoolData,
}: FormSchoolProps) {
  const { setSelectedSchoolId } = useSchoolContext();
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
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Função para parsear o endereço de forma segura
  const parseAddress = (address: AddressFields | string | null | undefined): AddressFields => {
    if (!address) {
      return {
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      };
    }

    // Se já for um objeto com os campos corretos, retorna diretamente
    if (typeof address === 'object' && 
        ('logradouro' in address || 'numero' in address || 'bairro' in address)) {
      return {
        logradouro: address.logradouro || "",
        numero: address.numero || "",
        bairro: address.bairro || "",
        cidade: address.cidade || "",
        estado: address.estado || "",
        cep: address.cep || "",
      };
    }

    // Se for string, tenta parsear como JSON
    if (typeof address === 'string') {
      try {
        const parsed = JSON.parse(address);
        return {
          logradouro: parsed.logradouro || "",
          numero: parsed.numero || "",
          bairro: parsed.bairro || "",
          cidade: parsed.cidade || "",
          estado: parsed.estado || "",
          cep: parsed.cep || "",
        };
      } catch {
        // Se não for JSON válido, trata como string simples
        return {
          logradouro: address, // Coloca toda a string no logradouro
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
        };
      }
    }

    // Caso padrão para qualquer outro formato não reconhecido
    return {
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    };
  };

  // Atualiza o searchTerm quando schoolId muda
  useEffect(() => {
    if (schoolId) {
      setSearchTerm(String(schoolId));
      setSelectedSchoolId(schoolId);
    }
  }, [schoolId, setSelectedSchoolId]);

  // Carrega os dados iniciais se schoolData estiver disponível
  useEffect(() => {
    if (schoolData) {
      setFormData({
        accountId: schoolData.accountId || 0,
        accountName: schoolData.accountName || "",
        status: schoolData.status || "ATIVO",
        email: schoolData.email || "",
      });

      setAddressFields(parseAddress(schoolData.address));
    }
  }, [schoolData]);

  // Busca os dados quando searchTerm muda
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

  const fetchSchoolData = async (id: string) => {
    try {
      const response = await api.get(`/accounts/${id}`);
      const data = response.data?.data?.[0] || response.data.data;

      if (data) {
        setFormData({
          accountId: data.accountId || 0,
          accountName: data.accountName || "",
          status: data.status || "ATIVO",
          email: data.email || "",
        });

        setAddressFields(parseAddress(data.address));
        setSelectedSchoolId(data.accountId);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da escola:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-4">
        <p className="text-base font-medium text-[#155DFC]">ID da Escola</p>
        <div className="mt-2 mb-8 h-12">
          <Input
            type="text"
            placeholder="Digite o ID da escola"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={true}
          />
          {searchLoading && (
            <p className="text-sm text-blue-500 mt-[-12]">Buscando escola...</p>
          )}
        </div>
      </div>

      <p className="text-base font-medium text-[#155DFC] mt-4">Nome da Escola</p>
      <Input
        type="text"
        value={formData.accountName}
        disabled={true}
      />

      <p className="text-base font-medium text-[#155DFC] mt-4">Endereço</p>
      <Input
        type="text"
        value={addressFields.logradouro}
        disabled={true}
      />


      <p className="text-base font-medium text-[#155efcd9] mt-4">Email da Escola</p>
      <Input
        type="email"
        value={formData.email}
        disabled={true}
      />

      <div className="mt-4">
        <label className="text-base font-medium text-[#155DFC]">Status</label>
        <Input
          type="text"
          value={formData.status}
          disabled={true}
        />
      </div>
    </div>
  );
}