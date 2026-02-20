"use server";

import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export async function loginAction(formData: FormData) {
  const ra = formData.get("ra") as string;
  const senha = formData.get("senha") as string;

  if (!ra || !senha) {
    return { error: "Preencha todos os campos." };
  }

  try {
   
    const aluno = await prisma.aluno.findUnique({
      where: { ra },
    });

    if (!aluno || aluno.senha !== senha) {
      return { error: "RA ou senha inválidos." };
    }

 
    return { success: true, nome: aluno.nome };
    
  } catch (error) {
    console.error("Erro no login:", error);
    return { error: "Erro interno no servidor. Tente novamente mais tarde." };
  }
}