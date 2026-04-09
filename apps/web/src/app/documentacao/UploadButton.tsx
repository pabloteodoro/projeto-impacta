"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

export function UploadButton({ documento }: { documento: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Arquivo selecionado para ${documento}:`, file.name);
     
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
    </>
  );
}