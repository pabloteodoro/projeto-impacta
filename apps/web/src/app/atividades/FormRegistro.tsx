"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, Trash2 } from "lucide-react";
import { saveAtividade } from "@/app/atividades/actions";

export function FormRegistro({ aluno }: { aluno: { id: number; nome: string; ra: string } }) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h3 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Registro de Atividade</h3>
        <Link href="/atividades" className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-4 py-1.5 rounded text-xs font-bold transition-all shadow-sm">
          Cancelar
        </Link>
      </div>

      <form action={(formData) => saveAtividade(formData, aluno.id)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Nome:</label>
          <input type="text" value={aluno.nome} readOnly className="md:col-span-3 bg-[#f9f9f9] border border-gray-200 rounded px-3 py-2 text-sm text-gray-400 outline-none" />
          
          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">RA:</label>
          <input type="text" value={aluno.ra} readOnly className="md:col-span-3 bg-[#f9f9f9] border border-gray-200 rounded px-3 py-2 text-sm text-gray-400 outline-none" />
          
          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Tipo da Atividade:</label>
          <select name="tipo" required className="md:col-span-3 border border-gray-300 rounded px-3 py-2 text-sm outline-none text-gray-700 font-medium">
            <option value="">-</option>
            <option value="Atividades Culturais - Cinema, Teatro, Museus e Exposições">Atividades Culturais - Cinema, Teatro, Museus e Exposições</option>
            <option value="Cidadania - Mesário em Eleições">Cidadania - Mesário em Eleições</option>
            <option value="Cidadania - Trabalho Voluntário">Cidadania - Trabalho Voluntário</option>
            <option value="Cursos - Cursos de Extensão (Presencial ou EAD)">Cursos - Cursos de Extensão (Presencial ou EAD)</option>
            <option value="Cursos - Cursos de Idiomas">Cursos - Cursos de Idiomas</option>
            <option value="Cursos - Treinamentos CISCO, AWS, AZURE">Cursos - Treinamentos CISCO, AWS, AZURE</option>
            <option value="Eventos - Palestras, Seminários, Congressos e Simpósios">Eventos - Palestras, Seminários, Congressos e Simpósios</option>
            <option value="Eventos - Workshops e Oficinas">Eventos - Workshops e Oficinas</option>
            <option value="Pesquisa - Iniciação Científica">Pesquisa - Iniciação Científica</option>
            <option value="Pesquisa - Publicação de Artigos">Pesquisa - Publicação de Artigos</option>
            <option value="Profissional - Estágio Não Obrigatório">Profissional - Estágio Não Obrigatório</option>
            <option value="Profissional - Visita Técnica">Profissional - Visita Técnica</option>
          </select>

          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Instituição:</label>
          <input name="instituicao" required type="text" className="md:col-span-3 border border-gray-300 rounded px-3 py-2 text-sm outline-none" />

          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Evento:</label>
          <input name="evento" required type="text" className="md:col-span-3 border border-gray-300 rounded px-3 py-2 text-sm outline-none" />

          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">De:</label>
          <input name="dataDe" required type="date" className="border border-gray-300 rounded px-3 py-2 text-sm outline-none" />
          
          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Até:</label>
          <input name="dataAte" required type="date" className="border border-gray-300 rounded px-3 py-2 text-sm outline-none" />

          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase">Horas:</label>
          <div className="md:col-span-3">
            <input name="horas" required type="number" className="w-20 border border-gray-300 rounded px-3 py-2 text-sm outline-none" />
          </div>

          <label className="text-[11px] font-bold text-gray-500 md:text-right uppercase self-start pt-2">Descrição:</label>
          <textarea name="descricao" rows={5} className="md:col-span-3 border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none" />
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-3">
            <label className="cursor-pointer bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95">
              <Upload size={14} /> Selecione o arquivo...
              <input 
                type="file" 
                name="arquivo" 
                accept="application/pdf" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
            </label>
            <button 
              type="button" 
              onClick={() => { setFile(null); if(fileInputRef.current) fileInputRef.current.value = ''; }} 
              className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <div className="text-[12px] font-bold text-gray-700">
            Arquivo(s) Enviado(s): 
            {file ? <span className="ml-2 text-blue-600 underline">{file.name}</span> : <span className="font-normal text-gray-400 ml-1">Nenhum.</span>}
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white px-8 py-2 rounded text-xs font-black shadow-md uppercase tracking-widest active:scale-95">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}