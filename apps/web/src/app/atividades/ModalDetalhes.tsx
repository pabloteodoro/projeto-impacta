"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface Atividade {
  id: number;
  tipo: string;
  instituicao: string;
  evento: string;
  dataDe: string; 
  dataAte: string;
  horas: number;
  descricao: string | null;
  status: string;
  retorno: string | null;
  arquivoPath: string | null;
  createdAt: string;
}

interface Aluno {
  id: number;
  nome: string;
  ra: string;
  curso: string | null;
}


interface ModalDetalhesProps {
  atividade: Atividade;
  aluno: Aluno;
  onClose: () => void;
}

export function ModalDetalhes({ atividade, aluno, onClose }: ModalDetalhesProps) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded shadow-2xl flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex justify-between items-start p-4 border-b">
          <h2 className="text-sm md:text-base font-bold text-gray-800 pr-8 uppercase tracking-tight">
            Atividade: {atividade.evento}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>


        <div className="p-4 overflow-y-auto">

          <div className="bg-[#f5f5f5] border border-gray-200 p-4 text-[11px] md:text-xs text-[#333]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <span className="font-bold block mb-0.5">Aluno:</span>
                <span className="text-gray-600">{aluno.nome}</span>
              </div>
              <div>
                <span className="font-bold block mb-0.5">RA:</span>
                <span className="text-gray-600">{aluno.ra}</span>
              </div>

              <div>
                <span className="font-bold block mb-0.5">Tipo da Atividade:</span>
                <span className="text-gray-600">{atividade.tipo}</span>
              </div>
              <div>
                <span className="font-bold block mb-0.5">Nome da Atividade:</span>
                <span className="text-gray-600">{atividade.evento}</span>
              </div>

              <div>
                <span className="font-bold block mb-0.5">Data Cadastro da Atividade:</span>
                <span className="text-gray-600">{new Date(atividade.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold block mb-0.5">Data de Início da Atividade:</span>
                  <span className="text-gray-600">{new Date(atividade.dataDe).toLocaleDateString('pt-BR')}</span>
                </div>
                <div>
                  <span className="font-bold block mb-0.5">Data Final da Atividade:</span>
                  <span className="text-gray-600">{new Date(atividade.dataAte).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 col-span-full gap-4">
                <div>
                  <span className="font-bold block mb-0.5">Status da Solicitação:</span>
                  <span className={atividade.status === 'Aprovado' ? 'text-green-600 font-bold' : 'text-orange-500 font-bold'}>
                    {atividade.status}
                  </span>
                </div>
                <div>
                  <span className="font-bold block mb-0.5">Qtd Horas Solicitadas:</span>
                  <span className="text-gray-600">{atividade.horas}</span>
                </div>
                <div>
                  <span className="font-bold block mb-0.5">Qtd Horas Aprovadas:</span>
                  <span className="text-gray-600">{atividade.status === 'Aprovado' ? atividade.horas : 0}</span>
                </div>
              </div>


              <div className="col-span-full border-t border-gray-300 pt-3 mt-1">
                <span className="font-bold block mb-0.5">Descrição da atividade enviada:</span>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {atividade.descricao || "-"}
                </p>
              </div>


              <div className="col-span-full border-t border-gray-300 pt-3 mt-1">
                <span className="font-bold block mb-0.5">Retorno da Análise Departamental:</span>
                <p className="text-gray-500 italic">
                  {atividade.retorno || "-"}
                </p>
              </div>
            </div>
          </div>

        
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-800 mb-4 border-b pb-1">Arquivos</h3>
            
            {atividade.arquivoPath ? (
              <div className="bg-[#e6e6e6] p-4 flex flex-col md:flex-row justify-between items-center rounded-sm gap-4">
                <div className="flex-1">
                  <span className="font-bold block uppercase text-[10px] text-gray-700">Nome do Arquivo:</span>
                  <span className="text-[12px] text-gray-600 break-all">{atividade.arquivoPath}</span>
                </div>
                
                <div className="text-right">
                  <span className="font-bold block uppercase text-[10px] text-gray-700">Data de Cadastro:</span>
                  <span className="text-[12px] text-gray-600">
                    {new Date(atividade.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 italic text-xs">
                Nenhum arquivo anexado a esta atividade.
              </div>
            )}
          </div>
        </div>

       
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-[#333] hover:bg-black text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <X size={14} /> Fechar
          </button>
        </div>
      </div>
    </div>
  );
}