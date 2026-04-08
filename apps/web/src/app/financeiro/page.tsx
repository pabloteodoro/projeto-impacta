export const runtime = "nodejs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChevronRight, Home, Check, Printer, FileText } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export default async function FinanceiroPage() {
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

  const mockFinanceiro = [
    { codigo: "1704432", desc: "Mensalidade ADS EAD - 3º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "31/03/2026" },
    { codigo: "1704431", desc: "Mensalidade ADS EAD - 2º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "03/03/2026" },
    { codigo: "1704430", desc: "Mensalidade ADS EAD - 1º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "28/01/2026" },
    { codigo: "1686900", desc: "Rematrícula ADS EAD - 1º/1", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "05/01/2026" },
    { codigo: "1619096", desc: "Mensalidade ADS EAD - 5º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "28/11/2025" },
    { codigo: "1619095", desc: "Mensalidade ADS EAD - 4º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "30/10/2025" },
    { codigo: "1619094", desc: "Mensalidade ADS EAD - 3º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "03/10/2025" },
    { codigo: "1619093", desc: "Mensalidade ADS EAD - 2º/5", bruto: "R$ 557,25", descValor: "R$ 107,27", previsto: "R$ 449,98", pago: true, vlPago: "R$ 449,98", data: "03/09/2025" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800">
      <Sidebar />

      <main className="lg:ml-72 flex flex-col min-h-screen">
        <Topbar 
          nome={aluno.nome} 
          ra={aluno.ra} 
          curso={aluno.curso ?? ""} 
        />

        <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex-1">
          
          <div className="mb-8">
            <h2 className="text-[28px] font-extrabold text-[#1a2b49] uppercase tracking-tight mb-3">
              FINANCEIRO
            </h2>
            
            <nav className="flex items-center text-sm text-gray-500 gap-2 overflow-x-auto whitespace-nowrap pb-2">
              <Link href="/login" className="flex items-center gap-1 hover:text-[#2b5a9e] cursor-pointer transition group">
                <Home size={16} className="text-gray-400 shrink-0 group-hover:text-[#2b5a9e] transition" />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <Link href="/home" className="hover:text-[#2b5a9e] cursor-pointer transition">
                Área do Aluno
              </Link>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <span className="text-[#2b5a9e] font-semibold">Financeiro</span> 
            </nav>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-gray-50/50 border-b border-gray-200 text-[13px] text-gray-600 space-y-2">
              <p>
                <span className="font-bold">* As informações contidas nesta página se destinam única e exclusivamente para fins informativos.</span> Não tem validade nenhuma como documento ou comprovante de pagamento.
              </p>
              <p>
                * O boleto referente as mensalidades serão disponibilizados na última semana do mês antecedente ao vencimento da parcela.<br/>
                Exemplo: Boleto referente a parcela de setembro será disponibilizado na última semana do mês de agosto e assim sucessivamente.
              </p>
              <p className="text-red-600 font-bold uppercase mt-2">
                * O prazo de baixa para os pagamentos efetuados é de até 10 dias após a data do pagamento.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-700 text-[13px]">
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Código</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Descrição</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Vl. Bruto</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Vl. Desconto</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Vl. Previsto</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap text-center">Pago</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Vl. Pago</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap">Data pgto.</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap text-center">Recibo</th>
                    <th className="px-4 py-4 font-bold whitespace-nowrap text-center">NFe</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-600">
                  {mockFinanceiro.map((item, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">{item.codigo}</td>
                      <td className="px-4 py-3">{item.desc}</td>
                      <td className="px-4 py-3">{item.bruto}</td>
                      <td className="px-4 py-3">{item.descValor}</td>
                      <td className="px-4 py-3">{item.previsto}</td>
                      <td className="px-4 py-3 text-center">
                        {item.pago && (
                          <div className="flex justify-center">
                            <Check className="text-[#5cb85c]" size={16} strokeWidth={3} />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">{item.vlPago}</td>
                      <td className="px-4 py-3">{item.data}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-gray-400 hover:text-gray-700 transition">
                          <Printer size={16} className="mx-auto" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-gray-400 hover:text-gray-700 transition">
                          <FileText size={16} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}