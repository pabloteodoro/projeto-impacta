"use client";

import { useState } from "react";
import { UploadButton } from "./UploadButton";
import { Trash2 } from "lucide-react";

type DocumentStatus = "Entregue" | "Não enviado" | "Em Validação";

interface Documento {
  nome: string;
  status: DocumentStatus;
  fileName?: string;
}

export function DocumentTable({ initialData }: { initialData: Documento[] }) {
  const [documentos, setDocumentos] = useState<Documento[]>(initialData);
  const [docToRemove, setDocToRemove] = useState<{ index: number; nome: string; fileName: string } | null>(null);

  const handleUploadComplete = (index: number, fileName: string) => {
    const newDocs = [...documentos];
    newDocs[index].status = "Em Validação";
    newDocs[index].fileName = fileName;
    setDocumentos(newDocs);
  };

  const requestDelete = (index: number) => {
    setDocToRemove({
      index,
      nome: documentos[index].nome,
      fileName: documentos[index].fileName || "",
    });
  };

  const confirmDelete = () => {
    if (docToRemove) {
      const newDocs = [...documentos];
      newDocs[docToRemove.index].status = "Não enviado";
      newDocs[docToRemove.index].fileName = undefined;
      setDocumentos(newDocs);
      setDocToRemove(null);
    }
  };

  return (
    <div className="overflow-x-auto p-6 pt-0 relative">
      <table className="w-full text-left border-collapse min-w-[600px] border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-sm">
            <th className="px-6 py-4 font-bold text-center w-1/2">Documento</th>
            <th className="px-6 py-4 font-bold text-center w-1/2">Situação</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {documentos.map((item, index) => {
            const isEntregue = item.status === "Entregue";
            const isEmValidacao = item.status === "Em Validação";

            let rowClass = "bg-gray-50/50 hover:bg-gray-100";
            if (isEntregue) rowClass = "bg-[#e8f5e9]/60 hover:bg-[#e8f5e9]";
            if (isEmValidacao) rowClass = "bg-[#fcf8e3] hover:bg-[#faf2cc]";

            return (
              <tr 
                key={index} 
                className={`border-b border-gray-200 transition-colors ${rowClass}`}
              >
                <td className="px-6 py-4">
                  {isEmValidacao ? (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => requestDelete(index)}
                        className="bg-[#d9534f] hover:bg-[#c9302c] text-white p-1.5 rounded transition shadow-sm flex-shrink-0"
                        title="Remover anexo"
                      >
                        <Trash2 size={16} />
                      </button>
                      <span className="font-medium text-[#337ab7] underline cursor-pointer hover:text-[#23527c] text-center">
                        {item.nome}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center font-medium text-gray-700">
                      {item.nome}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <span className={`font-semibold ${
                      isEntregue ? "text-green-700" : isEmValidacao ? "text-gray-600" : "text-gray-500"
                    }`}>
                      {item.status}
                    </span>
                    {!isEntregue && !isEmValidacao && (
                      <UploadButton onUploadComplete={(fileName) => handleUploadComplete(index, fileName)} />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {docToRemove && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200 text-center flex flex-col items-center">
            
            <div className="w-[84px] h-[84px] mb-5 rounded-full border-[3px] border-[#f0ad4e]/30 flex items-center justify-center text-[#f0ad4e] text-[40px] font-light">
              !
            </div>
            
            <h3 className="text-[22px] font-normal text-gray-600 mb-3">
              Deseja remover o documento?
            </h3>
            
            <p className="text-[14px] text-gray-500 mb-8 leading-relaxed px-4">
              Deseja realmente remover o documento {docToRemove.nome} - {docToRemove.fileName}?
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={confirmDelete}
                className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-6 py-2 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
              >
                Sim, remover!
              </button>
              <button
                onClick={() => setDocToRemove(null)}
                className="bg-[#999999] hover:bg-[#777777] text-white px-6 py-2 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
              >
                Não
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}