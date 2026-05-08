'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function saveAtividade(formData: FormData, alunoId: number) {
  const tipo = formData.get('tipo') as string
  const instituicao = formData.get('instituicao') as string
  const evento = formData.get('evento') as string
  const dataDe = new Date(formData.get('dataDe') as string)
  const dataAte = new Date(formData.get('dataAte') as string)
  const horas = parseInt(formData.get('horas') as string)
  const descricao = formData.get('descricao') as string


  await prisma.atividade.create({
    data: {
      tipo,
      instituicao,
      evento,
      dataDe,
      dataAte,
      horas,
      descricao,
      alunoId,
    },
  })


  revalidatePath('/atividades')
  

  redirect('/atividades')
}