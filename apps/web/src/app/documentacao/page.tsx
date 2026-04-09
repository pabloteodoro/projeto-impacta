export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { DocumentTable } from "./DocumentTable";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

type DocumentStatus = "Entregue" | "Não enviado" | "Em Validação";

export default async function MinhaDocumentacaoPage() {
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

  const mockDocumentos: { nome: string; status: DocumentStatus }[] = [
    { nome: "RG", status: "Entregue" },
    { nome: "CPF", status: "Entregue" },
    { nome: "Reservista", status: "Não enviado" },
    { nome: "Histórico Escolar", status: "Entregue" },
    { nome: "Comprovante de residência", status: "Entregue" },
    { nome: "Foto 3x4", status: "Não enviado" },
    { nome: "Certidão de Nascimento", status: "Não enviado" },
    { nome: "Certificado Conclusão", status: "Entregue" },
    { nome: "Certidão de Casamento", status: "Não enviado" },
    { nome: "Diploma de Graduação", status: "Não enviado" },
  ];

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
              MINHA DOCUMENTAÇÃO
            </h2>
            
            <nav className="flex items-center text-sm text-gray-500 gap-2 overflow-x-auto whitespace-nowrap pb-2">
              <Link href="/login" className="flex items-center gap-1 hover:text-[#2b5a9e] cursor-pointer transition group">
                <Home size={16} className="text-gray-400 shrink-0 group-hover:text-[#2b5a9e] transition" />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <Link href="/home" className="hover:text-[#2b5a9e] cursor-pointer transition">
                Área do Aluno
              </Link>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <span className="text-[#2b5a9e] font-semibold">Minha Documentação</span> 
            </nav>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
            
            <div className="p-6 border-b border-gray-100 flex flex-col gap-6">
              <div className="bg-[#fff9e6] border border-[#ffe082] text-[#b38600] px-5 py-4 rounded-lg text-sm font-medium shadow-sm">
                Atenção! O prazo para validação do seu documento é até 90 dias a partir da data de envio.
              </div>

              <div className="text-sm text-gray-600 space-y-2 bg-gray-50/50 p-5 rounded-lg border border-gray-100">
                <p className="font-bold text-gray-800 mb-2">OBS.:</p>
                <p>* Certidão de Casamento: Obrigatório para alunos com Estado Civil &apos;Casado(a)&apos;.</p>
                <p>* Diploma de Graduação: Obrigatório para portadores de diploma.</p>
              </div>
            </div>

            <DocumentTable initialData={mockDocumentos} />

          </div>

        </div>
      </main>
    </div>
  );
}