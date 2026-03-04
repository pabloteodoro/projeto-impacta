export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import {
  Megaphone, ChevronRight, Wallet, FileText,
  CreditCard, Briefcase, BarChart, Settings
} from "lucide-react";

const SECRET = process.env.JWT_SECRET!;

export default async function Dashboard() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, SECRET);
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">

      <Sidebar />

      <main className="flex-1 lg:ml-64">

        <Topbar />

        <div className="p-8 pt-2">

          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Avisos Importantes</h2>
            <p className="text-[10px] text-gray-400 mt-2 md:mt-0 text-right">
              Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">

              <div className="relative overflow-hidden rounded-2xl bg-[#fff8e1] p-6 shadow-sm border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6c23e] text-white shadow-md">
                    <Megaphone size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">Notificação Emissão Boletos</h4>
                    <span className="text-xs text-gray-500 font-medium">Prezado(a) Aluno(a),</span>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Anunciamos que foram emitidos novos boletos de pagamento ..
                    </p>
                    <div className="mt-2 text-right">
                      <button className="text-xs font-semibold text-blue-600 hover:underline">
                        Ver mais &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-800">Financeiro</h4>
                  <ChevronRight className="text-gray-400 cursor-pointer" size={20} />
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Saldo Atual:
                  <span className="font-bold text-gray-900 text-lg ml-1">R$ 0,00</span>
                </p>

                <div className="mb-6 flex gap-3">
                  <button className="flex items-center gap-2 rounded bg-[#2b5a9e] px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-[#1f437a] transition">
                    <Wallet size={16} /> Emitir Boleto
                  </button>
                  <button className="flex items-center gap-2 rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    <FileText size={16} /> Histórico de Pagamentos
                  </button>
                </div>

                <h5 className="mb-3 text-sm font-bold text-[#2b5a9e]">Pendências</h5>

                <div className="group rounded-xl bg-gray-50 p-4 border border-gray-100 flex justify-between items-center hover:bg-white hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-2.5 rounded-lg text-red-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Mensalidade Abril</p>
                      <p className="text-xs text-gray-500">15/05/2024 · PDF</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400 mb-1">Pendente</span>
                    <span className="font-bold text-red-600 text-sm">R$ 650,00 &gt;</span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <a href="#" className="text-sm text-blue-600 font-medium hover:underline flex items-center justify-center gap-1">
                    Ver todas as pendências <ChevronRight size={14} />
                  </a>
                </div>
              </div>

              <div className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a63] to-[#2b5a9e] p-8 text-white shadow-lg">
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-xl font-bold uppercase mb-1">RESPONDA NOSSA PESQUISA</h3>
                  <p className="text-sm text-blue-100/80 mb-0">
                    Desejamos conhecê-lo e aprimorar nossos serviços
                  </p>
                </div>
                <button className="z-10 rounded bg-gray-200 px-6 py-2 text-sm font-bold text-[#1e3a63] hover:bg-white transition shadow-lg">
                  Participe! &gt;
                </button>
              </div>

            </div>

            <div className="space-y-6">

              <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Financeiro</h4>
                <p className="text-xs text-gray-500 mb-4">
                  Saldo Atual: <span className="font-bold text-gray-900">R$ 0,00</span>
                </p>

                <div className="grid grid-cols-4 gap-2">
                  <QuickLink icon={<CreditCard size={18} />} label="Carteirinha Estudante" />
                  <QuickLink icon={<Briefcase size={18} />} label="Portal de Vagas" />
                  <QuickLink icon={<BarChart size={18} />} label="CPA Avaliações" />
                  <QuickLink icon={<Settings size={18} />} label="Parceria Microsoft" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-200/60 p-2 py-3 text-center hover:bg-white hover:shadow-md cursor-pointer transition h-24">
      <div className="text-[#2b5a9e] mb-1">{icon}</div>
      <span className="text-[9px] font-bold text-gray-600 leading-tight">{label}</span>
    </div>
  );
}