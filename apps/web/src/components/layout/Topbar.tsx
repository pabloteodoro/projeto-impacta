"use client";

import { LogOut, User } from "lucide-react";
import { logoutAction } from "@/app/logout/actions";

export function Topbar() {
  return (
    <header className="flex justify-end bg-[#f3f4f6] px-4 md:px-8 py-4">

      <div className="flex flex-col items-end gap-2">

        <div className="text-right leading-tight">
          <p className="text-sm md:text-base font-bold text-gray-800">
            Olá, Pablo
          </p>

          <p className="text-xs md:text-sm text-gray-500">
            RA: 2400741
          </p>

          <p className="text-[11px] md:text-xs text-gray-400 max-w-xs md:max-w-md">
            Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.
          </p>
        </div>

        {/* Avatar + Logout */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={18} />
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#2b5a9e] px-3 md:px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </form>
        </div>

      </div>
    </header>
  );
}