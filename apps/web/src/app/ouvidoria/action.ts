'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveOuvidoria(formData: FormData, alunoId: number) {
  const categoria = formData.get('categoria') as string
  const subcategoria = formData.get('subcategoria') as string
  const mensagem = formData.get('mensagem') as string

  if (!categoria || !subcategoria || !mensagem) {
    throw new Error('Todos os campos são obrigatórios.')
  }

  await prisma.atividade.create({
    data: {
      tipo: `Ouvidoria - ${categoria}`,
      instituicao: "Faculdade Impacta",
      evento: subcategoria,
      dataDe: new Date(),
      dataAte: new Date(),
      horas: 0,
      descricao: mensagem,
      alunoId: alunoId,
      status: "Pendente",
    },
  })

  revalidatePath('/ouvidoria')
  redirect('/ouvidoria?tab=historico')
}