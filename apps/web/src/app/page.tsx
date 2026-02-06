"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { 
  Megaphone, ChevronRight, Wallet, FileText, 
  CreditCard, Briefcase, BarChart, Settings 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-gray-800">

      <Sidebar />

 
      <main className="flex-1 lg:ml-64">
        
    
        <Topbar />

        <div className="p-8 pt-2">
    
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
             <h2 className="text-2xl font-bold text-gray-800">Avisos Importantes</h2>
             <p className="text-[10px] text-gray-400 mt-2 md:mt-0 text-right">
                Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.
             </p>
          </div>

      
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
          
            <div className="space-y-6 lg:col-span-2">
              
         
              <div className="relative overflow-hidden rounded-2xl bg-[#fff8e1] p-6 shadow-sm border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6c23e] text-white shadow-md">
                    <Megaphone size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">Notificação Emissão Boletos</h4>
                    <span className="text-xs text-gray-500 font-medium">Prezado(a) Aluno(a),</span>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Anunciamos que foram emitidos novos boletos de pagamento ..
                    </p>
                    <div className="mt-2 text-right">
                        <button className="text-xs font-semibold text-blue-600 hover:underline">
                        Ver mais &gt;
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-800">Financeiro</h4>
                  <ChevronRight className="text-gray-400 cursor-pointer" size={20} />
                </div>
                
                <p className="text-sm text-gray-500 mb-4">Saldo Atual: <span className="font-bold text-gray-900 text-lg ml-1">R$ 0,00</span></p>

                <div className="mb-6 flex gap-3">
                  <button className="flex items-center gap-2 rounded bg-[#2b5a9e] px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-[#1f437a] transition">
                    <Wallet size={16} /> Emitir Boleto
                  </button>
                  <button className="flex items-center gap-2 rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    <FileText size={16} /> Histórico de Pagamentos
                  </button>
                </div>

                <h5 className="mb-3 text-sm font-bold text-[#2b5a9e]">Pendências</h5>
                
             
                <div className="group rounded-xl bg-gray-50 p-4 border border-gray-100 flex justify-between items-center hover:bg-white hover:shadow-md transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="bg-red-100 p-2.5 rounded-lg text-red-500">
                        <FileText size={20}/>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Mensalidade Abril</p>
                        <p className="text-xs text-gray-500">15/05/2024 · PDF</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block text-xs text-gray-400 mb-1">Pendente</span>
                      <span className="font-bold text-red-600 text-sm">R$ 650,00 &gt;</span>
                   </div>
                </div>
                
                <div className="mt-5 text-center">
                   <a href="#" className="text-sm text-blue-600 font-medium hover:underline flex items-center justify-center gap-1">
                     Ver todas as pendências <ChevronRight size={14}/>
                   </a>
                </div>
              </div>

            
              <div className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a63] to-[#2b5a9e] p-8 text-white shadow-lg">
                <div className="relative z-10 max-w-lg">
                   <h3 className="text-xl font-bold uppercase mb-1">RESPONDA NOSSA PESQUISA</h3>
                   <p className="text-sm text-blue-100/80 mb-0">Desejamos conhecê-lo e aprimorar nossos serviços</p>
                </div>
                <button className="z-10 rounded bg-gray-200 px-6 py-2 text-sm font-bold text-[#1e3a63] hover:bg-white transition shadow-lg">
                  Participe! &gt;
                </button>
              </div>

            </div>

         
            <div className="space-y-6">
          
              <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Financeiro</h4>
                <p className="text-xs text-gray-500 mb-4">Saldo Atual: <span className="font-bold text-gray-900">R$ 0,00</span></p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button className="rounded bg-[#2b5a9e] py-2 text-[10px] font-bold text-white hover:bg-[#1f437a] flex flex-col items-center justify-center gap-1">
                     <Wallet size={12}/> Emitir Boleto
                  </button>
                  <button className="rounded border border-gray-200 py-2 text-[10px] font-bold text-gray-600 hover:bg-gray-50 flex flex-col items-center justify-center gap-1">
                     <FileText size={12}/> Histórico
                  </button>
                </div>

                <h5 className="mb-2 text-xs font-bold text-gray-600">Pendências</h5>
                <div className="mb-3 rounded-lg bg-gray-50 p-3 border border-gray-100 hover:bg-gray-100 transition cursor-pointer">
                    <p className="font-bold text-sm text-gray-800 mb-1">Mensalidade Abril</p>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-gray-500">15/05/2024</span>
                       <span className="font-bold text-red-600">R$ 650,00</span>
                    </div>
                </div>
                <div className="text-center border-t border-gray-100 pt-2">
                   <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Ver todas as pendências &gt;</a>
                </div>
              </div>

           
              <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-bold text-gray-800">Documentos</h4>
                  <span className="text-xs text-gray-400">Minhas Documentações &gt;</span>
                </div>
                
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 mb-4">
                   <div className="bg-red-100 text-red-600 h-8 w-8 flex items-center justify-center rounded text-xs font-bold">
                      A
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-gray-800 truncate">Anthony John</p>
                      <p className="text-[10px] text-gray-500 truncate">Boleto Mensalidade Abril</p>
                   </div>
                </div>

                <div className="space-y-2">
                    <button className="w-full rounded bg-gray-100 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200">
                    Ver todas as pendências &gt;
                    </button>
                    <button className="w-full rounded bg-[#2b5a9e] py-2 text-xs font-bold text-white hover:bg-[#1f437a]">
                    Ver Calendário Completo
                    </button>
                </div>
              </div>

     
              <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-gray-800">Calendário</h4>
                    <div className="flex text-xs text-gray-500 gap-2 items-center">
                       <span>Abril de 2024</span>
                       <div className="flex gap-1">
                          <button className="hover:text-black">&lt;</button>
                          <button className="hover:text-black">&gt;</button>
                       </div>
                    </div>
                 </div>
              
                 <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 mb-2">
                    <span>Do</span><span>Se</span><span>Te</span><span>Qu</span><span>Qu</span><span>Se</span><span>Sá</span>
                 </div>
               
                 <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-medium text-gray-600">
                    <span className="text-gray-300">30</span><span className="text-gray-300">31</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                    <span>6</span><span>7</span><span>8</span><span>9</span>
                    <span className="bg-[#2b5a9e] text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-blue-300">10</span>
                    <span>11</span><span>12</span>
                    <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                    <span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span>
                 </div>
                 <div className="mt-4 text-center">
                   <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Ver Calendário Completo &gt;</a>
                </div>
              </div>

          
              <div className="grid grid-cols-4 gap-2">
                  <QuickLink icon={<CreditCard size={18}/>} label="Carteirinha Estudante" />
                  <QuickLink icon={<Briefcase size={18}/>} label="Portal de Vagas" />
                  <QuickLink icon={<BarChart size={18}/>} label="CPA Avaliações" />
                  <QuickLink icon={<Settings size={18}/>} label="Parceria Microsoft" />
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


function QuickLink({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-200/60 p-2 py-3 text-center hover:bg-white hover:shadow-md cursor-pointer transition h-24">
            <div className="text-[#2b5a9e] mb-1">{icon}</div>
            <span className="text-[9px] font-bold text-gray-600 leading-tight">{label}</span>
        </div>
    )
}