export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import Link from "next/link";
import { ChevronRight, Plus, Play } from "lucide-react";
import { FormRegistro } from "./FormRegistro";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function AtividadesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; action?: string }>; 
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  interface DecodedToken { id: string; [key: string]: unknown; }
  let decoded: DecodedToken;

  try {
    decoded = jwt.verify(token, SECRET) as DecodedToken;
  } catch {
    redirect("/login");
  }

  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(decoded.id) },
    include: { atividades: { orderBy: { createdAt: 'desc' } } }
  });

  if (!aluno) redirect("/login");


  const somaHoras = await prisma.atividade.aggregate({
    _sum: { horas: true },
    where: { alunoId: aluno.id },
  });

  const horasCumpridas = somaHoras._sum.horas || 0;
  const horasNecessarias = 100;
  const porcentagem = Math.min(Math.round((horasCumpridas / horasNecessarias) * 100), 100);

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || 'atividades';
  const isNovo = resolvedParams.action === 'novo';

  const tabClass = (id: string) => `
    px-4 py-2 text-[13px] font-medium transition-all border border-gray-300 -mb-[1px] rounded-t-md
    ${activeTab === id 
      ? "bg-white border-b-white text-gray-700 z-10 shadow-[0_-2px_0_0_#9a9aff]" 
      : "bg-[#f5f5f5] text-[#666] hover:bg-gray-200"
    }
  `;

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">
      <Sidebar />
      <main className="flex-1 w-full lg:ml-64 flex flex-col">
        <Topbar nome={aluno.nome} ra={aluno.ra} curso={aluno.curso ?? ""} />

        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            
          
            <h1 className="text-[26px] font-black text-[#003366] uppercase tracking-tight mb-1">Atividades Complementares</h1>
            
        
            <div className="flex items-center gap-1 text-[11px] text-[#337ab7] mb-8 font-medium">
              <Link href="/home" className="hover:underline">Home</Link>
              <span className="text-gray-400 mx-1">{'>'}</span>
              <span className="hover:underline cursor-pointer">Área do Aluno</span>
              <span className="text-gray-400 mx-1">{'>'}</span>
              <span className="text-gray-500 font-normal">Atividades Complementares</span>
            </div>

          
            <div className="flex gap-1 ml-0.5">
              <Link href="/atividades?tab=atividades" className={tabClass('atividades')}>Atividades Complementares</Link>
              <Link href="/atividades?tab=regulamentos" className={tabClass('regulamentos')}>Regulamentos e Manuais</Link>
              <Link href="/atividades?tab=historico" className={tabClass('historico')}>Histórico de envios</Link>
            </div>

           
            <div className="bg-white rounded-b-md rounded-tr-md p-6 md:p-8 border border-gray-300 min-h-[450px]">
              
           
              {activeTab === 'atividades' && (
                !isNovo ? (
                  <div className="animate-in fade-in duration-300 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{aluno.curso}</h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">GRADE: ADS-EAD 2020.2</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold text-[11px] uppercase">Horas Necessárias:</span>
                        <span className="font-bold text-gray-700 text-xl">{horasNecessarias}h</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-400 font-bold text-[11px] uppercase">Horas Cumpridas:</span>
                        <span className="font-bold text-gray-700 text-xl">{horasCumpridas}h</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter">Quantidade de horas complementares:</p>
                      <div className="relative w-full h-7 bg-[#ebedef] rounded overflow-hidden border border-gray-200">
                        <div 
                          className="absolute top-0 left-0 h-full bg-[#00acee] flex items-center justify-center transition-all duration-700 ease-in-out"
                          style={{ width: `${porcentagem}%` }}
                        >
                          <span className="text-white text-[11px] font-bold">{porcentagem}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                        <span>0</span>
                        <span>Total: {horasNecessarias}h</span>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link href="/atividades?action=novo" className="inline-flex items-center gap-2 bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-5 py-2 rounded text-xs font-bold shadow-sm transition-all active:scale-95 uppercase">
                        <Plus size={14} /> Novo
                      </Link>
                    </div>
                  </div>
                ) : (
                  <FormRegistro aluno={{ id: aluno.id, nome: aluno.nome, ra: aluno.ra }} />
                )
              )}

            
              {activeTab === 'regulamentos' && (
                <div className="animate-in fade-in duration-300 space-y-6">
                  <h3 className="text-xl font-bold text-gray-700">Regulamentos</h3>
                  <div className="space-y-4">
                    <a 
                      href="https://account.impacta.edu.br/aluno/documentos/Regulamento%20de%20Atividades%20Complementares%20-%202026.pdf?1778279025" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#337ab7] hover:underline font-medium text-sm group"
                    >
                      <Play size={10} className="fill-[#337ab7] text-[#337ab7]" />
                      <span>Regulamento Atividades Complementares</span>
                    </a>
                  </div>
                </div>
              )}

          
              {activeTab === 'historico' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl font-bold text-gray-700 mb-6">Seus Envios</h3>
                  <div className="overflow-x-auto border rounded-md">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f9f9f9] text-gray-600 border-b">
                        <tr className="text-[11px] font-bold uppercase tracking-wider text-[#666]">
                          <th className="px-4 py-3">Data</th>
                          <th className="px-4 py-3">Tipo</th>
                          <th className="px-4 py-3">Evento</th>
                          <th className="px-4 py-3 text-center">Horas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {aluno.atividades.length > 0 ? aluno.atividades.map((atv) => (
                          <tr key={atv.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{atv.createdAt.toLocaleDateString('pt-BR')}</td>
                            <td className="px-4 py-3 font-medium text-gray-700">{atv.tipo}</td>
                            <td className="px-4 py-3 text-gray-600">{atv.evento}</td>
                            <td className="px-4 py-3 text-center font-bold text-[#00acee]">{atv.horas}h</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400 italic font-medium">Nenhuma atividade registrada ainda.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}