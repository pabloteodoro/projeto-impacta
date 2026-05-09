'use server'

import { prisma } from '@/lib/prisma' 
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveAtividade(formData: FormData, alunoId: number) {
  const file = formData.get('arquivo') as File;
  const fileName = file && file.name !== 'undefined' ? file.name : null;

  await prisma.atividade.create({
    data: {
      tipo: formData.get('tipo') as string,
      instituicao: formData.get('instituicao') as string,
      evento: formData.get('evento') as string,
      dataDe: new Date(formData.get('dataDe') as string),
      dataAte: new Date(formData.get('dataAte') as string),
      horas: parseInt(formData.get('horas') as string, 10),
      descricao: formData.get('descricao') as string,
      arquivoPath: fileName,
      alunoId: alunoId,
      status: "Pendente",
    },
  })

  revalidatePath('/atividades')
  redirect('/atividades?tab=historico')
}