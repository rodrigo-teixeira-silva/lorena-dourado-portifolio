'use client';

import Input from '@/components/Input';
import { Button } from '@/components/Button';
import { useState } from 'react';
import api from '@/app/api/axios';
import ParticlesBackground from '@/components/ParticlesBackground';

type FormData = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  linkedin: string;
  empresaAtual: string;
  experiencia: string;
  especialidades: string;
};

export default function ProductManagerForm() {
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    linkedin: '',
    empresaAtual: '',
    experiencia: '',
    especialidades: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await registerProductManager(formData);

      if (response.status === 201) {
        toast({
          title: 'Sucesso!',
          description: 'Cadastro realizado com sucesso!',
        });
        setFormData({
          nome: '',
          email: '',
          cpf: '',
          telefone: '',
          linkedin: '',
          empresaAtual: '',
          experiencia: '',
          especialidades: '',
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Erro ao cadastrar. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar. Verifique os dados e tente novamente.',
        variant: 'destructive',
      });
    }
  }

  async function registerProductManager(formData: FormData) {
    return await api.post('/product-managers', formData);
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F4] px-4">
      <ParticlesBackground />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-[#155DFC] mb-4">
          Cadastro de Product Manager
        </h1>

        <p className="text-base font-medium text-[#155DFC] mt-1">Nome</p>
        <Input name="nome" value={formData.nome} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">Email</p>
        <Input name="email" value={formData.email} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">CPF</p>
        <Input name="cpf" value={formData.cpf} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">Telefone</p>
        <Input name="telefone" value={formData.telefone} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">LinkedIn</p>
        <Input name="linkedin" value={formData.linkedin} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">Empresa Atual</p>
        <Input name="empresaAtual" value={formData.empresaAtual} onChange={handleChange} type={''} placeholder={''} />

        <p className="text-base font-medium text-[#155DFC] mt-1">Experiência (anos)</p>
        <Input
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          inputMode="numeric" type={''} placeholder={''}        />

        <p className="text-base font-medium text-[#155DFC] mt-1">Especialidades</p>
        <Input name="especialidades" value={formData.especialidades} onChange={handleChange} type={''} placeholder={''} />

        <Button type="submit" className="w-full mt-6 bg-[#155DFC] text-white hover:bg-[#0f4fd6]">
          Cadastrar
        </Button>
      </form>
    </section>
  );
}
type ToastFunction = (options: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;

function useToast(): { toast: ToastFunction } {
  return {
    toast: ({ title, description, variant = 'default' }) => {
      console.log(`[${variant.toUpperCase()}] ${title}: ${description}`);
    },
  };
}

