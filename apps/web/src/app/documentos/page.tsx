export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Download, FilePlus, ChevronRight, Home } from "lucide-react";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function DocumentosPage() {
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
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800">
      <Sidebar />

      <main className="lg:ml-72 flex flex-col min-h-screen">
        
        <Topbar 
          nome={aluno.nome} 
          ra={aluno.ra} 
          curso={aluno.curso ?? ""} 
        />

        <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex-1">
          
          <div className="mb-8">
            <h2 className="text-[28px] font-extrabold text-[#1a2b49] uppercase tracking-tight mb-3">
              Meus Documentos
            </h2>
            
            <nav className="flex items-center text-sm text-gray-500 gap-2 overflow-x-auto whitespace-nowrap pb-2">
              <Home size={16} className="text-gray-400 shrink-0" />
              <span className="hover:text-[#2b5a9e] cursor-pointer transition">Home</span>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <span className="hover:text-[#2b5a9e] cursor-pointer transition">Área do Aluno</span>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <span className="text-[#2b5a9e] font-semibold">Meus documentos</span> 
            </nav>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            <div className="p-6 border-b border-gray-100 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button className="flex items-center justify-center gap-2 bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm w-full sm:w-auto">
                  <Download size={18} />
                  Baixar Documentos
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm w-full sm:w-auto">
                  <FilePlus size={18} />
                  Solicitar Documentos
                </button>
              </div>

              <div className="bg-[#fff9e6] border border-[#ffe082] text-[#b38600] px-4 py-3 rounded-lg text-[13px] sm:text-sm font-medium italic">
                * Pelo botão &ldquo;Baixar Documentos&rdquo; você pode baixar gratuitamente a Declaração de Matrícula, Conteúdo Programático e o Contrato de Rematrícula
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-600 text-sm">
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Código</th>
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Documento</th>
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Valor</th>
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Dt Solicitação</th>
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Situação</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-500 bg-gray-50/30">
                      Nenhum documento solicitado no momento.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}