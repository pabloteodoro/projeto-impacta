export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import Link from "next/link";
import { Home, ChevronRight, Plus, Play } from "lucide-react";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

// No Next.js 15, searchParams e params agora são Promises
export default async function AtividadesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>; 
}) {
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

  // Precisamos resolver a Promise para que o componente reaja à mudança na URL
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || 'atividades';

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">
      <Sidebar />

      <main className="flex-1 w-full lg:ml-64 flex flex-col">
        <Topbar
          nome={aluno.nome}
          ra={aluno.ra}
          curso={aluno.curso ?? ""}
        />

        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full">
            
            <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium text-gray-400 mb-6">
              <Link href="/home" className="flex items-center hover:text-[#2b5a9e] transition-colors">
                <Home size={14} className="mr-1.5" />
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-gray-400">Área do Aluno</span>
              <ChevronRight size={12} />
              <span className="text-[#2b5a9e] font-bold underline underline-offset-4 decoration-2 tracking-tight">
                Atividades Complementares
              </span>
            </nav>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase tracking-tight">
                Atividades Complementares
              </h2>
            </div>

            {/* Abas com links que atualizam o searchParams */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6 gap-1">
              <Link 
                href="/atividades"
                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-colors shadow-sm ${
                  activeTab === 'atividades' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-[#002b5c]' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100/50'
                }`}
              >
                Atividades Complementares
              </Link>
              <Link 
                href="/atividades?tab=regulamentos"
                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-colors shadow-sm ${
                  activeTab === 'regulamentos' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-[#002b5c]' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100/50'
                }`}
              >
                Regulamentos e Manuais
              </Link>
              <Link 
                href="/atividades?tab=historico"
                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-colors shadow-sm ${
                  activeTab === 'historico' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-[#002b5c]' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100/50'
                }`}
              >
                Histórico de envios
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-md border border-gray-100 min-h-[400px]">
              
              {activeTab === 'atividades' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1">
                      {aluno.curso}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      Grade: ADS-EAD 2020.2
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Horas Necessárias:</span>
                      <span className="font-bold text-gray-800 text-lg">100h</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500">Horas Cumpridas:</span>
                      <span className="font-bold text-gray-800 text-lg">100h</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-tight">Quantidade de Horas Complementares:</p>
                    <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00acee] to-[#007fb1] flex items-center justify-center transition-all duration-1000"
                        style={{ width: '100%' }}
                      >
                        <span className="text-white text-xs font-black drop-shadow-md">100%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                      <span>0</span>
                      <span>Total: 100h</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <button className="flex items-center gap-2 bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95">
                      <Plus size={18} strokeWidth={3} />
                      Novo
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'regulamentos' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-8 border-b pb-4">
                    Regulamentos
                  </h3>
                  <div className="flex items-center gap-3 group">
                    <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Play size={12} className="text-blue-600 fill-blue-600" />
                    </div>
                    <Link 
                      href="https://account.impacta.edu.br/aluno/documentos/Regulamento%20de%20Atividades%20Complementares%20-%202026.pdf?1778279025" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base font-bold text-blue-600 hover:text-blue-800 hover:underline underline-offset-4 decoration-2 transition-all"
                    >
                      Regulamento Atividades Complementares
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'historico' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <ChevronRight size={32} className="rotate-90 opacity-20" />
                  </div>
                  <p className="text-sm font-semibold italic">Nenhum envio registrado até o momento.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}