"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

export default function GradeForm() {
  interface GradeData {
    name: string;
    description: string;
    accountId: number;
  }

  const [gradeData, setGradeData] = useState<GradeData>({
    name: "",
    description: "",
    accountId: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGradeData((prev) => ({ ...prev, [name]: value }));
  };

  const registerGrade = async (data: GradeData) => {
    const response = await fetch(`/accounts/${data.accountId}/grades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    });
    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeData.name || !gradeData.accountId) {
      alert("Preencha o nome da grade e o ID da escola");
      return;
    }

    setLoading(true);

    try {
      const response = await registerGrade(gradeData);
      if (response.ok) {
        alert("Grade cadastrada com sucesso!");
        setGradeData({ name: "", description: "", accountId: 0 });
      } else {
        const errorText = await response.text();
        console.error(errorText);
        alert("Erro ao cadastrar grade.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar os dados para o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Cadastrar Grade</h2>

      <Input
        type="text"
        name="name"
        value={gradeData.name}
        onChange={handleChange}
        placeholder="Nome da Grade"
      />

      <textarea
        name="description"
        value={gradeData.description}
        onChange={handleChange}
        placeholder="Descrição da Grade curricular"
        className="w-full mt-4 p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      <Input
        type="number"
        name="accountId"
        value={gradeData.accountId}
        onChange={handleChange}
        placeholder="ID da Escola (accountId)"
        className="mt-4"
      />

      <Button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Salvando..." : "Cadastrar Grade"}
      </Button>
    </form>
  );
}
