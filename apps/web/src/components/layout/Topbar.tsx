"use client";

import { LogOut, User } from "lucide-react";
import { logoutAction } from "@/app/logout/actions";

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-end bg-[#f3f4f6] px-8">
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-800">Olá, Pablo</p>
          <p className="text-xs text-gray-500">RA: 2400741</p>
        </div>

        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
          <User size={20} />
        </div>

        {/* 🔥 Logout usando Server Action, mas mantendo layout */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#2b5a9e] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-sm"
          >
            <LogOut size={14} /> Sair
          </button>
        </form>
      </div>
    </header>
  );
}