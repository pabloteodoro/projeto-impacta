export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { FormOuvidoria } from "@/components/formouvidoria/FormOuvidoria"
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
          
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-[#0f4c81] tracking-tight uppercase">
              Ouvidoria
            </h1>
            <div className="text-xs text-[#2b5a9e] mt-1 font-medium">
              Home <span className="text-gray-400">&gt;</span> Área do Aluno <span className="text-gray-400">&gt;</span> <span className="text-gray-600 font-normal">Ouvidoria</span>
            </div>
          </div>

    
          <div className="w-full">
            <FormOuvidoria alunoId={aluno.id} initialTab={currentTab} />
          </div>

        </div>
      </main>
    </div>
  );
}