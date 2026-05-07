export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function CPAPage() {
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

  const sections = [
    {
      title: 'RELATO INSTITUCIONAL',
      links: [{ label: 'FACULDADE IMPACTA - 2023', href: 'https://account.impacta.edu.br/res/files/cpa/Relato%20Institucional%20-%20Faculdade%20Impacta%20-%202023.pdf?1718112012' }],
    },
    {
      title: 'PROJETO DE AVALIAÇÃO INSTITUCIONAL',
      links: [{ label: 'FACULDADE IMPACTA - 2025/2027', href: 'https://account.impacta.edu.br/res/files/cpa/Projeto%20de%20Avaliacao%20Institucional%20-%20Faculdade%20Impacta%20-%202025-2027.pdf?1778112012' }],
    },
    {
      title: 'RELATÓRIO TRIENAL DE AUTOAVALIAÇÃO INSTITUCIONAL',
      links: [{ label: 'FACULDADE IMPACTA - 2022/2024', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20Trienal%20-%20Faculdade%20Impacta%20-%202022-2024.pdf?1778112012' }],
    },
    {
      title: 'RELATÓRIO DE AUTOAVALIAÇÃO',
      links: [
        { label: 'FACULDADE IMPACTA - 2013', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202013.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2014', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202014.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2015', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202015.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2016', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202016.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2017', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202017.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2018', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202018.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2019', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202019.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2020', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202020.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2022', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202022.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2023', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202023.pdf?1778112012' },
        { label: 'FACULDADE IMPACTA - 2025', href: 'https://account.impacta.edu.br/res/files/cpa/Relatorio%20de%20Autoavaliacao%20-%20Faculdade%20Impacta%20-%202025.pdf?1778112012' },
      ],
    },
  ];

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
          <div className="max-w-4xl mx-auto w-full">
            
        
            <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium text-gray-400 mb-6">
              <Link href="/home" className="flex items-center hover:text-[#2b5a9e] transition-colors">
                <Home size={14} className="mr-1.5" />
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-gray-400">Área do Aluno</span>
              <ChevronRight size={12} />
              <span className="text-[#2b5a9e] font-bold underline underline-offset-4 decoration-2">CPA</span>
            </nav>

           
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase tracking-tight">
                CPA (Comissão Própria de Avaliação)
              </h2>
            </div>

           
            <div className="flex flex-col gap-6 pb-20">
              {sections.map((section, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 md:p-10 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-6 border-l-4 border-[#2b5a9e] pl-4 uppercase tracking-wide">
                    {section.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {section.links.map((link, linkIdx) => (
                      <p key={linkIdx} className="text-[14px] text-gray-500 leading-relaxed font-medium">
                        Clique <Link 
                                href={link.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#2b5a9e] font-bold hover:underline underline-offset-2"
                              >
                                aqui
                              </Link> para acessar: 
                        <span className="ml-1 text-gray-700 uppercase">{link.label}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}