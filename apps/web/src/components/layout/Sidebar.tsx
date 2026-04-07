"use client";

import { useState } from "react";
import Link from "next/link";
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
  School,
  Link as LucideLink,
  Target,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isNew?: boolean;
  active?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuSections: MenuSection[] = [
    {
      title: "ACESSO RÁPIDO",
      items: [
        { icon: <FileText size={20} />, label: "Documentos / Prova SUB", href: "/documentos" },
        { icon: <Wallet size={20} />, label: "Financeiro Online", href: "/financeiro" },
        { icon: <FileText size={20} />, label: "Minha Documentação", href: "/documentacao" },
        { icon: <FolderOpen size={20} />, label: "Secretaria Online", active: true, href: "/secretaria" },
        { icon: <Book size={20} />, label: "Biblioteca", href: "/biblioteca" },
        { icon: <Briefcase size={20} />, label: "Portal de Vagas", href: "/vagas" },
        { icon: <School size={20} />, label: "CPA", href: "/cpa" },
        { icon: <Award size={20} />, label: "Atividades Complementares", href: "/atividades" },
        { icon: <Megaphone size={20} />, label: "Ouvidoria", href: "/ouvidoria" },
        { icon: <Settings size={20} />, label: "Requerimentos", href: "/requerimentos" },
        { icon: <MessageCircle size={20} />, label: "Contato Professores", href: "/contato" },
      ],
    },
    {
      title: "ESTUDOS",
      items: [
        { icon: <FlaskConical size={20} />, label: "SmartClass", isNew: true , href: "/smartclass" },
        { icon: <LucideLink size={20} />, label: "AVA - Orchestra", href: "/ava" },
        { icon: <GraduationCap size={20} />, label: "Nanodegree", href: "/nanodegree" },
        { icon: <Target size={20} />, label: "Prova Fácil", href: "/prova-facil" },
      ],
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

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
          fixed top-0 left-0 z-50 h-screen w-72
          bg-gradient-to-b from-[#0f1d38] to-[#0a1529]
          text-white transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:flex lg:flex-col
          border-r border-gray-700/30
        `}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-700/30 shrink-0">
          <Link href="/home" className="relative h-10 w-36 block cursor-pointer">
            <Image
              src="/logo-impacta.png"
              alt="Faculdade Impacta"
              fill
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4 hide-scroll">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="px-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase py-2">
                {section.title}
              </h3>
              
              {section.items.map((item, itemIdx) => (
                <SidebarItem 
                  key={itemIdx} 
                  icon={item.icon} 
                  label={item.label} 
                  href={item.href}
                  active={item.active}
                  isNew={item.isNew} 
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-700/50 p-4 shrink-0">
          <SidebarItem icon={<Settings size={20} />} label="Requisitos" href="/requisitos" />
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
  isNew,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm transition
        ${
          active
            ? "bg-blue-600/20 border-l-4 border-blue-500 text-white font-medium"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <div className="flex items-center gap-3 truncate">
        {icon}
        {label}
      </div>

      {isNew && (
        <span className="flex items-center justify-center bg-[#e02020] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">
          NOVO
        </span>
      )}
    </Link>
  );
}