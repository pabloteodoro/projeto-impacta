"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function FinanceiroModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-800">Prezado(a) aluno,</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 text-gray-600 text-[15px] leading-relaxed">
          <p className="font-bold text-gray-800 mb-2 uppercase">
            AVISO IMPORTANTE - Horário de expediente bancário para realização de pagamentos
          </p>
          <p className="mb-6">
            Os bancos possuem horário para realização de pagamentos via aplicativos e internet banking, os pagamentos realizados fora do horário determinado pelo banco são automaticamente agendados para o próximo dia útil. Desta forma orientamos ficar atento ao horário de expediente do seu banco para que não acarrete na perda do seu desconto.
          </p>
          <hr className="mb-6 border-gray-200" />
          <p>Atenciosamente,</p>
          <p>Financeiro Faculdade Impacta</p>
        </div>
        
        <div className="flex justify-end bg-gray-50 p-4 border-t border-gray-200 rounded-b-lg">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}