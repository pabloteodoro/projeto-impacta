export const runtime = "nodejs";
import { Calendar } from "@/components/calendario/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import {
  Megaphone,
  ChevronRight,
  CreditCard,
  Briefcase,
  BarChart,
  Settings,
} from "lucide-react";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  interface DecodedToken {
    id: string;
    [key: string]: unknown;
  }

  let decoded: DecodedToken;

  try {
    decoded = jwt.verify(token, SECRET) as DecodedToken;
  } catch {
    redirect("/login");
  }

  
  const aluno = await prisma.aluno.findUnique({
    where: {
      id: Number(decoded.id),
    },
  });

  if (!aluno) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">
      <Sidebar />

      <main className="flex-1 w-full lg:ml-64">
        <Topbar
          nome={aluno.nome}
          ra={aluno.ra}
          curso={aluno.curso ?? ""}
        />

        <div className="p-4 md:p-6 lg:p-8 pt-4">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Avisos Importantes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">

              <div className="relative overflow-hidden rounded-2xl bg-[#fff8e1] p-4 md:p-6 shadow-sm border border-orange-100">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6c23e] text-white shadow-md">
                    <Megaphone size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-gray-800">
                      Notificação Emissão Boletos
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">
                      Prezado(a) {aluno.nome},
                    </span>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Anunciamos que foram emitidos novos boletos de pagamento ..
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 md:p-6 shadow-md border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-base md:text-lg font-bold text-gray-800">
                    Financeiro
                  </h4>
                  <ChevronRight className="text-gray-400 cursor-pointer" size={20} />
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Saldo Atual:
                  <span className="font-bold text-gray-900 text-lg ml-1">
                    R$ 0,00
                  </span>
                </p>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a63] to-[#2b5a9e] p-6 md:p-8 text-white shadow-lg">
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase mb-1">
                    RESPONDA NOSSA PESQUISA
                  </h3>
                  <p className="text-sm text-blue-100/80">
                    Desejamos conhecê-lo e aprimorar nossos serviços
                  </p>
                </div>

                <button className="w-full md:w-auto rounded bg-gray-200 px-6 py-2 text-sm font-bold text-[#1e3a63] hover:bg-white transition shadow-lg">
                  Participe!
                </button>
              </div>

            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-4 md:p-5 shadow-md border border-gray-100">
                <h4 className="text-base md:text-lg font-bold text-gray-800 mb-1">
                  Financeiro
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <QuickLink icon={<CreditCard size={18} />} label="Carteirinha Estudante" />
                  <QuickLink icon={<Briefcase size={18} />} label="Portal de Vagas" />
                  <QuickLink icon={<BarChart size={18} />} label="CPA Avaliações" />
                  <QuickLink icon={<Settings size={18} />} label="Parceria Microsoft" />
                </div>
              </div>
              <Calendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickLink({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-200/60 p-3 text-center hover:bg-white hover:shadow-md cursor-pointer transition min-h-[90px]">
      <div className="text-[#2b5a9e]">{icon}</div>
      <span className="text-[10px] font-bold text-gray-600 leading-tight">
        {label}
      </span>
    </div>
  );
}