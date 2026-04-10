export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function BibliotecaPage() {
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
              E-BOOKS
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
              <span className="text-[#2b5a9e] font-semibold">E-books</span> 
            </nav>
          </div>

          <div className="flex flex-col gap-6 mb-8">
              
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                DOAB Directory of Open Access Book
              </h3>
              <p className="text-[15px] text-gray-600 mb-4 leading-relaxed">
                O DOAB é um diretório de livros de acesso aberto.
              </p>
              <p className="text-[14px] text-gray-700">
                Clique <a href="https://www.doabooks.org/" target="_blank" rel="noopener noreferrer" className="text-[#337ab7] hover:text-[#23527c] hover:underline font-medium">aqui</a> para acessar:
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                SciELO Livros
              </h3>
              <p className="text-[15px] text-gray-600 mb-4 leading-relaxed">
                A SciELO Livros é parte integral do Programa SciELO. Visa a publicação online de coleções nacionais e temáticas de livros acadêmicos com o objetivo de maximizar a visibilidade, acessibilidade, uso e impacto das pesquisas, ensaios e estudos publicados.
              </p>
              <p className="text-[14px] text-gray-700">
                Clique <a href="https://books.scielo.org/" target="_blank" rel="noopener noreferrer" className="text-[#337ab7] hover:text-[#23527c] hover:underline font-medium">aqui</a> para acessar:
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}