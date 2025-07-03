"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import api from "@/app/api/axios";
import { Button } from "../Button";
import InputMask from "@/components/InputMask";

function formatBirthDateToDashed(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

function removeNonDigits(str: string): string {
  return str.replace(/\D/g, "");
}

interface FormCoordenadorPedagogicoProps {
  schoolId: number | null;
}

export default function FormCoordinator({
  schoolId,
}: FormCoordenadorPedagogicoProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    number: "",
    phonePrimary: "",
    phoneSecondary: "",
    contactType: "PEDAGOGO",
    documentId: "",
    birthDate: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
    gender: "MASCULINO",
    status: "ATIVO",
    accountId: schoolId || 0, 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.documentId || !formData.email) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    setLoading(true);

    try {
      const response = await registerNewCoordinator(formData);
      if (response.status === 201 || response.status === 200) {
        alert("Coordenador cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar coordenador!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar os dados para o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-0">
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto max-h-[85vh]">
          <p className="text-base font-medium text-[#155DFC] mt-1">
            Nome Completo
          </p>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ex: João da Silva"
          />

          <InputMask
            name="documentId"
            value={formData.documentId}
            onChange={handleChange}
            placeholder="999.999.999-99"
            mask="000.000.000-00"
            required
            label="CPF"
          />

          <InputMask
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="00/00/0000"
            mask="00/00/0000"
            required
            label="Data de Nascimento"
          />

          <InputMask
            name="phonePrimary"
            value={formData.phonePrimary}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            mask="(00) 00000-0000"
            required
            label="Telefone Principal"
          />

          <InputMask
            name="phoneSecondary"
            value={formData.phoneSecondary}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            mask="(00) 00000-0000"
            required
            label="Telefone Secundário"
          />

          <p className="text-base font-medium text-[#155DFC] mt-1">Email</p>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@escola.com"
          />

          <p className="text-base font-medium text-[#155DFC] mt-1">Endereço</p>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ex: Rua das Flores"
          />

          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <p className="text-base font-medium text-[#155DFC] mt-1">
                Número
              </p>
              <Input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Ex: 304"
              />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-[#155DFC] mt-1">
                Bairro
              </p>
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Ex: Centro"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-1">
            <div className="flex-1">
              <p className="text-base font-medium text-[#155DFC] mt-1">
                Cidade
              </p>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex: Manaus"
              />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-[#155DFC] mt-1">
                Estado
              </p>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Ex: Amazonas"
              />
            </div>
          </div>

          <InputMask
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="69000-000"
            mask="00000-000"
            required
            label="CEP"
          />

          <p className="text-base font-medium text-[#155DFC] mt-1">Gênero</p>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMININO">FEMININO</option>
            <option value="OUTRO">Outro</option>
          </select>

          <p className="text-base font-medium text-[#155DFC] mt-1">
            Id da Escola
          </p>
          <Input
            type="number"
            name="accountId"
            value={String(formData.accountId)}
            onChange={handleChange}
            placeholder="Digite o id da escola"
          />

          <p className="text-base font-medium text-[#155DFC] mt-4">Status</p>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-1 dark:bg-gray-700 dark:text-white"
          >
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
          </select>

          <Button
            type="submit"
            disabled={loading}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center"
          >
            {loading ? "Processando..." : "Cadastrar Coordenador"}
          </Button>
        </div>
      </div>
    </form>
  );
}

async function registerNewCoordinator(formData: {
  fullName: string;
  documentId: string;
  birthDate: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  gender: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  number: string;
  status?: string;
  accountId?: number;
}) {
  const formattedDate = formatBirthDateToDashed(formData.birthDate);

  return await api.post("/contacts", {
    ...formData,
    documentId: removeNonDigits(formData.documentId),
    birthDate: formattedDate,
    contactType: "PEDAGOGO",
    status: "ATIVO",
    accountId: Number(formData.accountId),
  });
}