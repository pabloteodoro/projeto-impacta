"use client";

import { useState } from "react";
import { ModalDetalhes } from "./ModalDetalhes";


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
  saldo: number;
}

interface TabelaHistoricoProps {
  atividades: Atividade[];
  aluno: Aluno;
}

export function TabelaHistorico({ atividades, aluno }: TabelaHistoricoProps) {

  const [selectedAtividade, setSelectedAtividade] = useState<Atividade | null>(null);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-separate border-spacing-0 border border-gray-300 rounded-sm">
          <thead className="bg-[#e6e6e6] text-[#333] font-bold">
            <tr>
              <th className="px-3 py-2 border-r border-b border-gray-300 whitespace-nowrap">Nome da Atividade</th>
              <th className="px-3 py-2 border-r border-b border-gray-300 whitespace-nowrap">Data cadastro</th>
              <th className="px-3 py-2 border-r border-b border-gray-300 text-center whitespace-nowrap">Qtd horas Aprovadas</th>
              <th className="px-3 py-2 border-r border-b border-gray-300 whitespace-nowrap">Status</th>
              <th className="px-3 py-2 border-r border-b border-gray-300 whitespace-nowrap">Retorno</th>
              <th className="px-3 py-2 border-b border-gray-300 text-center whitespace-nowrap">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {atividades.length > 0 ? (
              atividades.map((atv) => (
                <tr key={atv.id} className="hover:bg-gray-50 group">
                  <td className="px-3 py-3 border-r border-b border-gray-300 font-medium">
                    {atv.evento}
                  </td>
                  <td className="px-3 py-3 border-r border-b border-gray-300">
                    {new Date(atv.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-3 py-3 border-r border-b border-gray-300 text-center font-bold">
                    {atv.status === "Aprovado" ? atv.horas : 0}
                  </td>
                  <td className="px-3 py-3 border-r border-b border-gray-300 text-center">
                    <span
                      className={`font-bold ${
                        atv.status === "Aprovado" ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {atv.status === "Aprovado" ? "✔ Aprovado" : `⏳ ${atv.status}`}
                    </span>
                  </td>
                  <td className="px-3 py-3 border-r border-b border-gray-300 text-gray-500 italic max-w-[150px] truncate">
                    {atv.retorno || "-"}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-300 text-center">
                    <button
                      onClick={() => setSelectedAtividade(atv)}
                      className="bg-white border border-gray-300 rounded px-2 py-1 text-[10px] font-bold hover:bg-gray-100 uppercase tracking-tighter shadow-sm transition-all active:scale-95"
                    >
                      + Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400 italic">
                  Nenhuma atividade registrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedAtividade && (
        <ModalDetalhes
          atividade={selectedAtividade}
          aluno={aluno}
          onClose={() => setSelectedAtividade(null)}
        />
      )}
    </div>
  );
}