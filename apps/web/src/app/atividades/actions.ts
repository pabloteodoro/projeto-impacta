'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function saveAtividade(formData: FormData, alunoId: number) {
  const file = formData.get('arquivo') as File; // Captura o arquivo pelo atributo 'name'
  const fileName = file && file.name !== 'undefined' ? file.name : null;

  await prisma.atividade.create({
    data: {
      tipo: formData.get('tipo') as string,
      instituicao: formData.get('instituicao') as string,
      evento: formData.get('evento') as string,
      dataDe: new Date(formData.get('dataDe') as string),
      dataAte: new Date(formData.get('dataAte') as string),
      horas: parseInt(formData.get('horas') as string),
      descricao: formData.get('descricao') as string,
      arquivoPath: fileName, // Salva o nome identico do arquivo
      alunoId: alunoId,
      status: "Pendente",
    },
  })

  revalidatePath('/atividades')
  redirect('/atividades?tab=historico')
}