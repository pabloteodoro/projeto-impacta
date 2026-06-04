
'use client'

import React, { useState } from 'react'
import { saveOuvidoria } from '@/app/ouvidoria/action'
import { useRouter } from 'next/navigation'

interface AtividadeSerializada {
  id: number;
  tipo: string;
  evento: string;
  descricao: string | null;
  dataDe: string;
  status: string;
}

interface FormOuvidoriaProps {
  alunoId: number;
  initialTab: 'ouvidoria' | 'historico';
  historicoInicial: AtividadeSerializada[];
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

export function FormOuvidoria({ alunoId, initialTab, historicoInicial }: FormOuvidoriaProps) {
  const router = useRouter()
  const [tab, setTab] = useState<'ouvidoria' | 'historico'>(initialTab)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('')
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<string>('')
  const [mensagem, setMensagem] = useState<string>('')
  
  const [fontSize, setFontSize] = useState<number>(14)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!categoriaSelecionada || !subcategoriaSelecionada || !mensagem.trim()) {
      setShowErrorModal(true)
      return
    }

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveOuvidoria(formData, alunoId)

      setCategoriaSelecionada('')
      setSubcategoriaSelecionada('')
      setMensagem('')

      setShowSuccessModal(true)
    } catch (error) {
      alert('Erro ao processar sua manifestação na Ouvidoria.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fecharSuccessModal = () => {
    setShowSuccessModal(false)
  
    setTab('historico')
    router.push('/ouvidoria?tab=historico')
  }

  const aumentarFonte = () => {
    setFontSize(prev => (prev < 24 ? prev + 2 : prev))
  }

  const diminuirFonte = () => {
    setFontSize(prev => (prev > 10 ? prev - 2 : prev))
  }

  const subcategoriasDisponiveis = categoriaSelecionada 
    ? subcategoriasPorCategoria[categoriaSelecionada] || [] 
    : []

  return (
    <div className="w-full space-y-4 relative" style={{ fontSize: `${fontSize}px` }}>
      
  
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[450px] rounded-sm p-8 flex flex-col items-center justify-center shadow-2xl border border-gray-100 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full border-4 border-[#ffb076] flex items-center justify-center mb-6">
              <span className="text-[#ffb076] text-5xl font-light select-none font-sans">!</span>
            </div>
            <h4 className="text-gray-700 text-3xl font-normal mb-2 tracking-tight">Atenção</h4>
            <p className="text-gray-500 text-sm md:text-base font-normal mb-8">Por favor, preencha todos os campos obrigatórios.</p>
            <button
              type="button"
              onClick={() => setShowErrorModal(false)}
              className="w-full sm:w-[120px] bg-[#3482d2] hover:bg-[#286fa3] text-white text-sm py-2 px-4 rounded-sm transition-colors uppercase tracking-wider font-normal shadow-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}

      
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[540px] rounded-sm p-8 md:p-10 flex flex-col items-center justify-center shadow-2xl border border-gray-100 text-center animate-fade-in">
            

            <div className="w-24 h-24 rounded-full border-[3px] border-[#e3f7e9] bg-[#f4fbf7] flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-[#72d58e]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h4 className="text-[#555555] text-3xl font-normal mb-3 tracking-tight">
              Atenção
            </h4>

        
            <p className="text-gray-500 text-sm md:text-base font-normal max-w-sm mb-8 leading-relaxed">
              Mensagem enviada com sucesso. Por favor aguarde nossa resposta.
            </p>

        
            <button
              type="button"
              onClick={fecharSuccessModal}
              className="w-full sm:w-[120px] bg-[#3482d2] hover:bg-[#286fa3] text-white text-sm py-2 px-4 rounded-sm transition-colors uppercase tracking-wider font-normal shadow-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}

     
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex border-b border-[#c0c0c0] bg-transparent w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setTab('ouvidoria')}
            className="px-6 py-2 font-semibold border-t border-x transition-colors rounded-t-sm"
            style={{ 
              fontSize: '0.85em',
              backgroundColor: tab === 'ouvidoria' ? '#e0e0e0' : 'rgba(255,255,255,0.6)',
              borderColor: tab === 'ouvidoria' ? '#c0c0c0' : 'transparent',
              color: tab === 'ouvidoria' ? '#1f2937' : '#6b7280'
            }}
          >
            Ouvidoria
          </button>
          <button
            type="button"
            onClick={() => setTab('historico')}
            className="px-6 py-2 font-semibold border-t border-x transition-colors rounded-t-sm"
            style={{ 
              fontSize: '0.85em',
              backgroundColor: tab === 'historico' ? '#e0e0e0' : 'rgba(255,255,255,0.6)',
              borderColor: tab === 'historico' ? '#c0c0c0' : 'transparent',
              color: tab === 'historico' ? '#1f2937' : '#6b7280'
            }}
          >
            Histórico
          </button>
        </div>

        <div className="flex justify-end gap-1 self-end sm:self-auto text-[10px]">
          <button type="button" onClick={aumentarFonte} className="bg-[#dcdcdc] hover:bg-gray-300 border border-gray-400 font-bold px-2 py-1 text-[#444] rounded-sm transition text-xs">A+</button>
          <button type="button" onClick={diminuirFonte} className="bg-[#dcdcdc] hover:bg-gray-300 border border-gray-400 font-bold px-2 py-1 text-[#444] rounded-sm transition text-xs">A-</button>
        </div>
      </div>

      
      <div className="bg-[#f5f5f5] border border-[#c0c0c0] rounded-sm shadow-sm p-4 md:p-8">
        {tab === 'ouvidoria' ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-5xl">
            <h3 className="font-medium tracking-tight text-gray-900" style={{ fontSize: '1.1em' }}>
              Deixe ideias, sugestões e críticas, será muito importante para nós.
            </h3>

            <div className="space-y-1">
              <label htmlFor="categoria" className="block font-bold text-gray-700" style={{ fontSize: '0.85em' }}>Categorias:</label>
              <select
                id="categoria"
                name="categoria"
                value={categoriaSelecionada}
                onChange={(e) => {
                  setCategoriaSelecionada(e.target.value)
                  setSubcategoriaSelecionada('')
                }}
                className="w-full bg-white border border-[#b8b8b8] px-3 py-2 focus:outline-none focus:border-[#0f4c81] text-gray-700 rounded-sm"
                style={{ fontSize: '0.85em' }}
              >
                <option value="">Selecione uma categoria</option>
                {Object.keys(subcategoriasPorCategoria).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="subcategoria" className="block font-bold text-gray-700" style={{ fontSize: '0.85em' }}>Subcategorias:</label>
              <select
                id="subcategoria"
                name="subcategoria"
                value={subcategoriaSelecionada}
                onChange={(e) => setSubcategoriaSelecionada(e.target.value)}
                disabled={!categoriaSelecionada}
                className="w-full bg-white disabled:bg-gray-100 disabled:text-gray-400 border border-[#b8b8b8] px-3 py-2 focus:outline-none focus:border-[#0f4c81] text-gray-700 rounded-sm"
                style={{ fontSize: '0.85em' }}
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
              <label htmlFor="mensagem" className="block font-bold text-gray-700" style={{ fontSize: '0.85em' }}>Mensagem:</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={8}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full bg-white border border-[#b8b8b8] p-3 focus:outline-none focus:border-[#0f4c81] text-gray-800 rounded-sm resize-y"
                style={{ fontSize: '0.85em' }}
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-[140px] bg-[#007acc] hover:bg-[#0066aa] text-white font-bold py-2.5 px-4 rounded-sm transition-colors shadow-sm uppercase tracking-wider disabled:bg-gray-400"
                style={{ fontSize: '0.85em' }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        ) : (
          
          <div className="space-y-4">
            {historicoInicial.length > 0 ? (
              historicoInicial.map((ativ) => {
                const categoriaPura = ativ.tipo.replace("Ouvidoria - ", "");
                const dataFormatada = new Date(ativ.dataDe).toLocaleDateString('pt-BR');

                return (
                  <div 
                    key={ativ.id} 
                    className="bg-white border border-gray-200 p-4 rounded-sm shadow-sm font-sans text-gray-800 leading-relaxed text-left space-y-3 animate-fade-in"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b border-gray-100 pb-2 text-xs sm:text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Categoria:</span> {categoriaPura}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Subcategoria:</span> {ativ.evento}
                      </div>
                      <div className="sm:text-right">
                        <span className="font-semibold text-gray-700">Data da mensagem:</span> {dataFormatada}
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm pt-1">
                      <span className="font-semibold text-gray-700 block mb-1">Mensagem Aluno(a):</span>
                      <p className="bg-gray-50/50 p-3 rounded-sm border border-gray-100 text-gray-600 whitespace-pre-wrap break-words">
                        {ativ.descricao}
                      </p>
                    </div>

                    <div className="text-[11px] sm:text-xs text-gray-400 italic pt-1">
                      Por favor aguarde a resposta.
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-sm bg-white text-gray-500" style={{ fontSize: '0.85em' }}>
                Nenhuma manifestação anterior encontrada no seu histórico acadêmico.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}