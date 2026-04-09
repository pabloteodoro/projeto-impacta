"use client";

import { useRef, useState } from "react";
import { Upload, Check } from "lucide-react";

export function UploadButton({ documento }: { documento: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      event.target.value = "";
      setShowModal(true);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 bg-white border border-[#2b5a9e] text-[#2b5a9e] hover:bg-[#2b5a9e] hover:text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm"
      >
        <Upload size={14} />
        Anexar
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-sm bg-white p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-200 text-center flex flex-col items-center">
            
            <div className="w-24 h-24 mb-6 rounded-full border-[3px] border-[#e8f5e9] flex items-center justify-center relative">
              <div className="absolute inset-1 rounded-full border-[3px] border-transparent border-t-[#5cb85c] rotate-45 opacity-20"></div>
              <Check className="text-[#5cb85c]" size={56} strokeWidth={2} />
            </div>
            
            <h3 className="text-[22px] font-normal text-gray-600 mb-5">
              Arquivos foram salvos!
            </h3>
            
            <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
              Iremos validar seu documento em um prazo de 7 dias úteis. Em caso de aprovação ou reprovação você será notificado por e-mail, ou poderá acompanhar o status por aqui
            </p>
            
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#337ab7] hover:bg-[#286090] text-white px-10 py-2 rounded-[3px] text-[15px] font-medium transition-colors shadow-sm"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </>
  );
}