"use client";

import { 
  Wallet, FileText, FolderOpen, Mail, Book, Briefcase, 
  Award, Megaphone, MessageCircle, Settings
} from "lucide-react";
import Image from "next/image"; // Se tiver a logo, use. Caso contrário, texto.

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-gradient-to-b from-[#0f1d38] to-[#0a1529] text-white transition-transform lg:translate-x-0 hidden lg:flex">
      {/* Logo Area */}
      <div className="flex h-20 items-center px-8">
        {/* Substitua pelo componente <Image /> se tiver a logo salva em public */}
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          IMPACTA
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <SidebarItem icon={<Wallet size={20} />} label="Financeiro" active />
        <SidebarItem icon={<FileText size={20} />} label="Documentos" badge="Novo" />
        <SidebarItem icon={<FolderOpen size={20} />} label="Minha Documentação" />
        <SidebarItem icon={<Mail size={20} />} label="Secretaria Online" />
        <SidebarItem icon={<Book size={20} />} label="Biblioteca" hasSubmenu />
        <SidebarItem icon={<Briefcase size={20} />} label="Portal de Vagas" badge="Novo" />
        <SidebarItem icon={<Award size={20} />} label="Atividades Complementares" />
        <SidebarItem icon={<Megaphone size={20} />} label="Ouvidoria" hasSubmenu />
        <SidebarItem icon={<MessageCircle size={20} />} label="Contato dos Professores" hasSubmenu />
      </nav>

      {/* Footer / Requisitos */}
      <div className="border-t border-gray-700/50 p-4">
        <SidebarItem icon={<Settings size={20} />} label="Requisitos" hasSubmenu />
      </div>
    </aside>
  );
}

// Subcomponente auxiliar apenas para a Sidebar (pode ficar no mesmo arquivo)
function SidebarItem({ icon, label, badge, active, hasSubmenu }: any) {
  return (
    <div className={`
      group flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-all
      ${active ? "bg-white/10 text-white shadow-lg backdrop-blur-sm" : "text-gray-400 hover:bg-white/5 hover:text-white"}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
        {hasSubmenu && <span className="text-xs opacity-50">›</span>}
      </div>
    </div>
  );
}