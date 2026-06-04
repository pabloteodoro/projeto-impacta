
export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { FormOuvidoria } from "@/components/formouvidoria/FormOuvidoria";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

export default async function OuvidoriaDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
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

  const historicoAtividades = await prisma.atividade.findMany({
    where: {
      alunoId: aluno.id,
      tipo: {
        startsWith: "Ouvidoria -",
      },
    },
    orderBy: {
      dataDe: "desc",
    },
  });

  const historicoSerializado = historicoAtividades.map((ativ) => ({
    id: ativ.id,
    tipo: ativ.tipo,
    evento: ativ.evento,
    descricao: ativ.descricao,
    dataDe: ativ.dataDe.toISOString(),
    status: ativ.status,
  }));

  const resolvedSearchParams = await searchParams;
  const currentTab = resolvedSearchParams.tab === "historico" ? "historico" : "ouvidoria";

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">
      <Sidebar />

      <main className="flex-1 w-full lg:ml-64 overflow-x-hidden flex flex-col">
        <Topbar
          nome={aluno.nome}
          ra={aluno.ra}
          curso={aluno.curso ?? ""}
        />

        <div className="w-full max-w-6xl mx-auto p-4 md:p-10 pt-4 flex-1 flex flex-col justify-start">
          
        
          <div className="mb-6 select-none">
            <h1 className="text-3xl font-black text-[#000000] tracking-tight uppercase font-sans">
              Ouvidoria
            </h1>
            
            <div className="flex items-center gap-1.5 text-sm text-[#777777] mt-2 font-normal">
             
              <Link href="/login" className="flex items-center gap-1 hover:text-[#0f4c81] transition-colors">
                <svg 
                  className="w-4 h-4 text-[#888888] mb-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              
              <span className="text-gray-400 text-xs font-light">&gt;</span>
              

              <Link href="/home" className="hover:text-[#0f4c81] transition-colors">
                Área do Aluno
              </Link>
              
              <span className="text-gray-400 text-xs font-light">&gt;</span>
              
          
              <span className="text-[#0f4c81] font-semibold">
                Ouvidoria
              </span>
            </div>
          </div>

          <div className="w-full">
            <FormOuvidoria 
              alunoId={aluno.id} 
              initialTab={currentTab} 
              historicoInicial={historicoSerializado} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}