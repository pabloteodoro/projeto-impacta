'use server'

import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation' 
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET!

export async function loginAction(formData: FormData) {
  const ra = formData.get('ra') as string
  const senha = formData.get('senha') as string

  const aluno = await prisma.aluno.findUnique({
    where: { ra }
  })

  if (!aluno || aluno.senha !== senha) {
    throw new Error('Credenciais inválidas')
  }

  const token = jwt.sign({ id: aluno.id }, SECRET, { expiresIn: '1d' })
  
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  redirect('/home')
}