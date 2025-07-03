"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import InputMask from "@/components/InputMask";
import { Button } from "@/components/Button";
import api from "@/app/api/axios";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

const cleanDocumentId = (doc: string) => doc.replace(/\D/g, '');

interface FormData {
  fullName: string;
  email: string;
  documentId: string;
  phonePrimary: string;
  phoneSecondary: string;
  contactType: string;
  birthDate: string;
  status: string;
  gender: string;
  accountId: number;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ApiResponse {
  status: number;
  message: string;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  data: {
    contactId: number;
    fullName: string;
    documentId: string;
    birthDate: string;
    phonePrimary: string;
    phoneSecondary: string;
    status: string;
    contactType: string;
    accountId: number;
    gender: string;
    email: string;
    address: string;
  }[];
  correlationId: string;
  dateTime: string;
}

interface ErrorResponse {
  errors: Array<{
    field: string;
    message: string;
  }>;
  message: string;
}

const CONTACT_TYPES = {
  ALUNO: "ALUNO",
  PEDAGOGO: "PEDAGOGO",
  RESPONSAVEL: "RESPONSAVEL",
  FUNCIONARIO: "FUNCIONARIO",
  PAIS: "PAIS",
  PROFESSOR: "PROFESSOR"
};

export default function FormContact() {
  const [contactId, setContactId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedContactType, setSelectedContactType] = useState<string>(CONTACT_TYPES.ALUNO);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    documentId: "",
    phonePrimary: "",
    phoneSecondary: "",
    contactType: CONTACT_TYPES.ALUNO,
    birthDate: "",
    status: "ATIVO",
    gender: "MASCULINO",
    accountId: 0,
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "accountId") {
      setFormData(prev => ({ ...prev, [name]: value === "" ? 0 : Number(value) }));
    } else if (name === "contactType") {
      setSelectedContactType(value);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Validação dos campos obrigatórios
      if (!formData.documentId || !formData.fullName || !formData.email ||
        !formData.phonePrimary || !formData.birthDate || !formData.accountId || formData.accountId <= 0) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente!");
        return;
      }
  
      // Validação do formato da data
      if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.birthDate)) {
        alert("Por favor, insira uma data válida no formato DD-MM-AAAA");
        return;
      }
  
      setLoading(true);
  
      // Formatação do endereço
      const formattedAddress = [
        formData.street,
        formData.number && `, ${formData.number}`,
        formData.district && ` - ${formData.district}`,
        formData.city && formData.state && `, ${formData.city} - ${formData.state}`,
        formData.zipCode && `, CEP: ${formData.zipCode}`
      ].filter(Boolean).join('');
  
      // Converter a data de DD-MM-AAAA para AAAA-MM-DD
      const [day, month, year] = formData.birthDate.split('-');
      const formattedBirthDate = `${year}-${month}-${day}`;
  
      // Preparar o payload com os dados formatados
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        documentId: cleanDocumentId(formData.documentId),
        birthDate: formattedBirthDate,
        address: formattedAddress,
        phonePrimary: formData.phonePrimary.replace(/\D/g, ''),
        phoneSecondary: formData.phoneSecondary.replace(/\D/g, ''),
        contactType: formData.contactType,
        status: formData.status,
        gender: formData.gender,
        accountId: formData.accountId
      };
  
      console.log("Payload sendo enviado:", payload);
  
      const method = contactId ? 'put' : 'post';
      const url = method === 'put' ? `/contacts/${contactId}` : '/contacts';
  
      const response = await api[method]<ApiResponse>(url, payload);
      
      if (response.status === 200 || response.status === 201) {
        alert(`${formData.contactType} ${contactId ? 'atualizado' : 'cadastrado'} com sucesso!`);
        localStorage.removeItem("documentId");
        
        setContactId(null);
        router.push("/RegisteredContacts");
      } else {
        alert(`Erro: ${response.data.message || "Status inválido"}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
  
      if (isAxiosError(error)) {
        console.error("Detalhes do erro:", error.response?.data);
        const errorResponse = error.response?.data as ErrorResponse;
        
        if (errorResponse?.errors) {
          const messages = errorResponse.errors.map(err => 
            `${err.field || 'Erro'}: ${err.message}`
          ).join('\n');
          alert(`Erro ao enviar dados:\n${messages}`);
        } else {
          alert(errorResponse?.message || "Erro ao enviar dados");
        }
      } else {
        alert("Erro inesperado ao enviar dados");
      }
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const parseAddress = (address: string) => {
    if (!address) return {
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      zipCode: ""
    };

    const cepMatch = address.match(/(CEP:?\s*)?(\d{5}-\d{3})/i);
    const zipCode = cepMatch?.[2] || "";

    const remainingAddress = address.replace(/(CEP:?\s*)?\d{5}-\d{3}/i, "").trim();
    const parts = remainingAddress.split(/\s*,\s*/).filter(part => part.trim() !== '');

    let street = "";
    let number = "";
    let district = "";
    let city = "";
    let state = "";

    if (parts.length > 0) {
      const streetPart = parts[0];
      const streetNumberMatch = streetPart.match(/(.*?)\s*-\s*(\d+)/);
      if (streetNumberMatch) {
        street = streetNumberMatch[1].trim();
        number = streetNumberMatch[2].trim();
      } else {
        street = streetPart.trim();
      }
    }

    if (parts.length > 1) {
      district = parts[1].replace(/^\d+\s*-\s*/, "").trim();
    }

    if (parts.length > 2) {
      const cityStatePart = parts[2];
      const cityStateMatch = cityStatePart.match(/(.*?)\s*-\s*(.*)/);
      if (cityStateMatch) {
        city = cityStateMatch[1].trim();
        state = cityStateMatch[2].trim();
      } else {
        city = cityStatePart.trim();
      }
    }

    return {
      street,
      number,
      district,
      city,
      state,
      zipCode
    };
  };
  
  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const cleanDoc = cleanDocumentId(searchTerm);
      if (!cleanDoc || cleanDoc.length !== 11) {
        alert("Por favor, insira um CPF válido com 11 dígitos.");
        return;
      }
  
      const response = await api.get<ApiResponse>('/contacts', {
        params: {
          documentId: cleanDoc,
          page: 1,
          pageSize: 100,
        },
      });
      

      // Busca o contato pelo tipo
      const contactData = response.data.data.find(c => c.contactType === selectedContactType);

      if (!contactData) {
        alert(`${selectedContactType} não encontrado com o CPF informado.`);
        return;
      }
  
      const address = parseAddress(contactData.address || "");
  
      setFormData({
        fullName: contactData.fullName || "",
        email: contactData.email || "",
        documentId: contactData.documentId || "",
        phonePrimary: contactData.phonePrimary || "",
        phoneSecondary: contactData.phoneSecondary || "",
        contactType: contactData.contactType || selectedContactType,
        birthDate: contactData.birthDate || "",
        status: contactData.status || "ATIVO",
        gender: contactData.gender || "MASCULINO",
        accountId: contactData.accountId || 0,
        street: address.street || "",
        number: address.number || "",
        district: address.district || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || ""
      });
  
      setContactId(contactData.contactId);
      console.log("Resposta =>",contactId)
      alert(`${selectedContactType} encontrado!`);
    } catch (error) {
      console.error(`Erro ao buscar ${selectedContactType}:`, error);
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        alert(errorResponse?.message || `Erro ao buscar ${selectedContactType}`);
      } else {
        alert(`Erro inesperado ao buscar ${selectedContactType}`);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("documentId");
    if (savedId) {
      setSearchTerm(savedId);
    }
  }, []);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl mx-auto p-4 h-[calc(80vh-2rem)] flex flex-col"
    >
      <div className="bg-white rounded-lg shadow-md p-2 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 4rem)' }}>
        <h2 className="text-xl font-bold text-[#155DFC] mb-6">Cadastro de Contato</h2>
        
        <div className="mb-6">
          <p className="text-base font-medium text-[#155DFC]">Buscar Contato Existente</p>
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <InputMask
                mask="000.000.000-00"
                placeholder="Digite o CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="searchCpf"
              />
            </div>
            <select
              name="contactTypeSearch"
              value={selectedContactType}
              onChange={(e) => setSelectedContactType(e.target.value)}
              className="block w-48 border h-12 border-gray-300 p-2 rounded"
            >
              <option value={CONTACT_TYPES.ALUNO}>Aluno</option>
              <option value={CONTACT_TYPES.PEDAGOGO}>Pedagogo</option>
              <option value={CONTACT_TYPES.RESPONSAVEL}>Responsável</option>
              <option value={CONTACT_TYPES.FUNCIONARIO}>Funcionário</option>
              <option value={CONTACT_TYPES.PROFESSOR}>Professor</option>
              <option value={CONTACT_TYPES.PAIS}>Pais</option>
            </select>
            <Button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading}
              className="w-32 h-12"
            >
              {searchLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-base font-medium text-[#155DFC]">Tipo de Contato</label>
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            >
              <option value={CONTACT_TYPES.ALUNO}>Aluno</option>
              <option value={CONTACT_TYPES.PROFESSOR}>Professor</option>
              <option value={CONTACT_TYPES.PEDAGOGO}>Pedagogo</option>
              <option value={CONTACT_TYPES.RESPONSAVEL}>Responsável</option>
              <option value={CONTACT_TYPES.FUNCIONARIO}>Funcionário</option>
              <option value={CONTACT_TYPES.PAIS}>Pais</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-[#155DFC]">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            >
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-base font-medium text-[#155DFC]">Nome Completo *</label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div>
            <label className="text-base font-medium text-[#155DFC]">Email *</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-medium text-[#155DFC]">Gênero *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMININO">FEMININO</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
            <div>
              <InputMask
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="DD-MM-AAAA"
                mask="00-00-0000"
                required
                label="Data de Nascimento *"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputMask
                name="documentId"
                value={formData.documentId}
                onChange={handleChange}
                placeholder="999.999.999-99"
                mask="000.000.000-00"
                required
                label="CPF *"
              />
            </div>
            <div>
              <Input
                name="accountId"
                value={formData.accountId === 0 ? "" : formData.accountId}
                onChange={handleChange}
                type="number"
                placeholder="ID da Escola"
                label="ID da Escola Associada *"
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-[#155DFC]">Endereço</h3>
            
            <div className="mt-2">
              <label className="text-base font-medium text-[#155DFC]">Rua *</label>
              <Input
                name="street"
                value={formData.street}
                onChange={handleChange}
                type="text"
                placeholder="Ex: Rua Teste"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <label className="text-base font-medium text-[#155DFC]">Número</label>
                <Input
                  type="text"
                  placeholder="Ex: 304"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-base font-medium text-[#155DFC]">Bairro</label>
                <Input
                  type="text"
                  placeholder="Ex: Centro"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
              <div>
                <InputMask
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="00000-000"
                  mask="00000-000"
                  label="CEP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-base font-medium text-[#155DFC]">Cidade</label>
                <Input
                  type="text"
                  placeholder="Ex: Manaus"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-base font-medium text-[#155DFC]">Estado</label>
                <Input
                  type="text"
                  placeholder="Ex: Amazonas"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputMask
                name="phonePrimary"
                value={formData.phonePrimary}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
                mask="(00) 00000-0000"
                label="Telefone Principal *"
                required
              />
            </div>
            <div>
              <InputMask
                name="phoneSecondary"
                value={formData.phoneSecondary}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
                mask="(00) 00000-0000"
                label="Telefone Secundário"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#155DFC] text-white px-6 py-2 rounded hover:bg-[#1247b6] transition"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </span>
            ) : "Salvar"}
          </Button>
        </div>
      </div>
    </form>
  );
}