"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function loginAction(formData: FormData) {
  const ra = formData.get("ra") as string;
  const senha = formData.get("senha") as string;

  if (!ra || !senha) {
    return { error: "Preencha todos os campos." };
  }

  const aluno = await prisma.aluno.findUnique({
    where: { ra },
  });

  if (!aluno || aluno.senha !== senha) {
    return { error: "RA ou senha inválidos." };
  }

  const token = jwt.sign(
    {
      id: aluno.id,
      ra: aluno.ra,
      nome: aluno.nome,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // 🚀 Redirect direto no servidor (CORRETO)
  redirect("/home");
}