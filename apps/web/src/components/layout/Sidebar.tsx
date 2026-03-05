"use client";

import { useState } from "react";
import {
  Wallet,
  FileText,
  FolderOpen,
  Mail,
  Book,
  Briefcase,
  Award,
  Megaphone,
  MessageCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#2b5a9e] text-white p-2 rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

    
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          bg-gradient-to-b from-[#0f1d38] to-[#0a1529]
          text-white transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:flex lg:flex-col
        `}
      >
      
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-700/30">
          <div className="relative h-10 w-36">
            <Image
              src="/logo-impacta.png"
              alt="Faculdade Impacta"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={20} />
          </button>
        </div>

        
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <SidebarItem icon={<Wallet size={20} />} label="Financeiro" active />
          <SidebarItem icon={<FileText size={20} />} label="Documentos" />
          <SidebarItem icon={<FolderOpen size={20} />} label="Minha Documentação" />
          <SidebarItem icon={<Mail size={20} />} label="Secretaria Online" />
          <SidebarItem icon={<Book size={20} />} label="Biblioteca" />
          <SidebarItem icon={<Briefcase size={20} />} label="Portal de Vagas" />
          <SidebarItem icon={<Award size={20} />} label="Atividades Complementares" />
          <SidebarItem icon={<Megaphone size={20} />} label="Ouvidoria" />
          <SidebarItem icon={<MessageCircle size={20} />} label="Contato Professores" />
        </nav>

        <div className="border-t border-gray-700/50 p-4">
          <SidebarItem icon={<Settings size={20} />} label="Requisitos" />
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm transition
        ${
          active
            ? "bg-blue-600/20 border-l-4 border-blue-500 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {icon}
      {label}
    </div>
  );
}