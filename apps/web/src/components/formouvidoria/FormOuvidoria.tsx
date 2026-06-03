// src/components/ouvidoria/FormOuvidoria.tsx
'use client'

import React, { useState } from 'react'
import { saveOuvidoria } from '@/app/ouvidoria/action'

interface FormOuvidoriaProps {
  alunoId: number;
  initialTab: 'ouvidoria' | 'historico';
}

const subcategoriasPorCategoria: Record<string, string[]> = {
  "Achados e Perdidos": ["Achados e Perdidos"],
  "Agendamento de sala de Estudo": ["Sala / Laboratório"],
  "Biblioteca": [
    "Acervo (disponibilidade / indisponibilidade)",
    "Atendimento biblioteca",
    "Limpeza e conservação",
    "Outros motivos",
    "Sala de estudo"
  ],
  "Coordenação": ["Atendimento coordenação de curso", "Outros motivos", "Prova PAI"],
  "EAD": [
    "Avaliação",
    "Biblioteca online",
    "Didática",
    "Google Classroom e aula online",
    "Lançamento de nota",
    "Nanodegree",
    "Outros motivos",
    "Trancamento / Cancelamento de matrícula"
  ],
  "Elogios": ["Elogios"],
  "Financeiro": [
    "Atendimento financeiro",
    "Boleto indisponível no portal",
    "Boleto sem desconto",
    "Cobrança indevida",
    "Insatisfação com atendimento recebido via e-mail / telefone",
    "Não houve retorno da solicitação realizada",
    "Outros motivos",
    "Vouchers"
  ],
  "Infraestrutura Predial": [
    "Atendimento inspetores de aluno",
    "Infraestrutura banheiros",
    "Infraestrutura laboratórios",
    "Infraestrutura salas de aula",
    "Limpeza predial",
    "Outros motivos"
  ],
  "Infraestrutura Tecnológica": [
    "Atendimento equipe de suporte",
    "Equipamentos de laboratório",
    "Hardware",
    "Microsoft Imagine",
    "Outros motivos",
    "Problemas no site/portal",
    "SmartClass",
    "Software",
    "Wi-Fi"
  ],
  "NAP (NÚCLEO DE APOIO PEDAGÓGICO ao aluno)": ["Atendimento"],
  "Professores Colégio": [
    "Conduta de professor em sala de aula",
    "Didática",
    "Falta/atraso",
    "Lançamento de nota/frequência",
    "Outros motivos"
  ],
  "Professores Graduação": [
    "Conduta de professor em sala de aula",
    "Didática",
    "Falta/atraso",
    "Gravação/disponibilização das aulas no smartclass",
    "Lançamento de nota/frequência",
    "Outros motivos"
  ],
  "Professores Pós-Graduação/MBA": [
    "Conduta de professor em sala de aula",
    "Didática",
    "Falta/atraso",
    "Gravação/disponibilização das aulas no smartclass",
    "Lançamento de nota/frequência",
    "Outros motivos"
  ],
  "Secretaria Colégio": [
    "Atendimento secretaria",
    "Bilhete SPTRANS/EMTU",
    "Entrega de documentos",
    "Justificativa de faltas",
    "Outros motivos",
    "Trancamento / Cancelamento de matrícula"
  ],
  "Secretaria Graduação": [
    "Atendimento FIES/PROUNI",
    "Atendimento secretaria",
    "Bilhete SPTRANS/EMTU",
    "Colação de grau",
    "Diploma",
    "Entrega de documentos",
    "Justificativa de faltas",
    "Outros motivos",
    "Trancamento / Cancelamento de matrícula"
  ],
  "Secretaria Pós-Graduação/MBA": [
    "Atendimento secretaria",
    "Bilhete SPTRANS/EMTU",
    "Certificado de conclusão",
    "Entrega de documentos",
    "Justificativa de faltas",
    "Outros motivos",
    "Trancamento / Cancelamento de matrícula"
  ],
  "Sugestão de Melhorias": ["Sugestão de Melhorias"]
}

export function FormOuvidoria({ alunoId, initialTab }: FormOuvidoriaProps) {
  const [tab, setTab] = useState<'ouvidoria' | 'historico'>(initialTab)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await saveOuvidoria(formData, alunoId)
    } catch (error) {
      alert('Erro ao processar sua manifestação na Ouvidoria.')
    }
  }

  const subcategoriasDisponiveis = categoriaSelecionada 
    ? subcategoriasPorCategoria[categoriaSelecionada] || [] 
    : []

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex border-b border-[#c0c0c0] bg-transparent w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setTab('ouvidoria')}
            className={`px-6 py-2 text-xs font-semibold border-t border-x transition-colors rounded-t-sm ${
              tab === 'ouvidoria'
                ? 'bg-[#e0e0e0] border-[#c0c0c0] text-gray-800'
                : 'bg-white/60 border-transparent text-gray-500 hover:bg-white'
            }`}
          >
            Ouvidoria
          </button>
          <button
            type="button"
            onClick={() => setTab('historico')}
            className={`px-6 py-2 text-xs font-semibold border-t border-x transition-colors rounded-t-sm ${
              tab === 'historico'
                ? 'bg-[#e0e0e0] border-[#c0c0c0] text-gray-800'
                : 'bg-white/60 border-transparent text-gray-500 hover:bg-white'
            }`}
          >
            Histórico
          </button>
        </div>

        <div className="flex justify-end gap-1 self-end sm:self-auto">
          <button type="button" className="bg-[#dcdcdc] hover:bg-gray-300 border border-gray-400 text-[10px] font-bold px-2 py-1 text-[#444] rounded-sm transition">A+</button>
          <button type="button" className="bg-[#dcdcdc] hover:bg-gray-300 border border-gray-400 text-[10px] font-bold px-2 py-1 text-[#444] rounded-sm transition">A-</button>
        </div>
      </div>

      <div className="bg-[#f5f5f5] border border-[#c0c0c0] rounded-sm shadow-sm p-4 md:p-8">
        {tab === 'ouvidoria' ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl">
            <h3 className="text-sm md:text-base text-gray-900 font-medium tracking-tight">
              Deixe ideias, sugestões e críticas, será muito importante para nós.
            </h3>

            <div className="space-y-1">
              <label htmlFor="categoria" className="block text-xs font-bold text-gray-700">
                Categorias:
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                className="w-full bg-white border border-[#b8b8b8] px-3 py-2 text-xs focus:outline-none focus:border-[#0f4c81] text-gray-700 rounded-sm"
              >
                <option value="">Selecione uma categoria</option>
                {Object.keys(subcategoriasPorCategoria).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="subcategoria" className="block text-xs font-bold text-gray-700">
                Subcategorias:
              </label>
              <select
                id="subcategoria"
                name="subcategoria"
                required
                disabled={!categoriaSelecionada}
                className="w-full bg-white disabled:bg-gray-100 disabled:text-gray-400 border border-[#b8b8b8] px-3 py-2 text-xs focus:outline-none focus:border-[#0f4c81] text-gray-700 rounded-sm"
              >
                <option value="">
                  {categoriaSelecionada ? "Selecione uma subcategoria" : "Selecione uma categoria primeiro"}
                </option>
                {subcategoriasDisponiveis.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="mensagem" className="block text-xs font-bold text-gray-700">
                Mensagem:
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={8}
                required
                className="w-full bg-white border border-[#b8b8b8] p-3 text-xs focus:outline-none focus:border-[#0f4c81] text-gray-800 rounded-sm resize-y"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="w-full md:w-[140px] bg-[#007acc] hover:bg-[#0066aa] text-white text-xs font-bold py-2.5 px-4 rounded-sm transition-colors shadow-sm uppercase tracking-wider"
              >
                Enviar
              </button>
            </div>
          </form>
        ) : (
          <div className="text-xs text-gray-500 text-center py-16 border border-dashed border-gray-300 rounded-sm bg-white">
            Nenhuma manifestação anterior encontrada no seu histórico acadêmico.
          </div>
        )}
      </div>
    </div>
  )
}