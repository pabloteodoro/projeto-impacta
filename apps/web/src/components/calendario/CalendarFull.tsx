"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

const diasSemana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export function CalendarFull() {

  const hoje = new Date();

  const [dataAtual,setDataAtual] = useState(new Date());

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDia = new Date(ano,mes,1).getDay();
  const diasMes = new Date(ano,mes+1,0).getDate();

  const dias = [];

  for(let i=0;i<primeiroDia;i++){
    dias.push(null);
  }

  for(let i=1;i<=diasMes;i++){
    dias.push(i);
  }

  function mudarMes(dir:number){
    setDataAtual(new Date(ano,mes+dir,1));
  }

  function mudarAno(dir:number){
    setDataAtual(new Date(ano+dir,mes,1));
  }

  return (

    <div className="w-full">

      {/* CONTROLES */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex gap-2">
          <button onClick={()=>mudarAno(-1)} className="px-2 py-1 bg-gray-100 rounded">
            «
          </button>

          <button onClick={()=>mudarMes(-1)} className="px-2 py-1 bg-gray-100 rounded">
            <ChevronLeft size={18}/>
          </button>
        </div>

        <h3 className="font-bold text-lg">
          {meses[mes]} de {ano}
        </h3>

        <div className="flex gap-2">
          <button onClick={()=>mudarMes(1)} className="px-2 py-1 bg-gray-100 rounded">
            <ChevronRight size={18}/>
          </button>

          <button onClick={()=>mudarAno(1)} className="px-2 py-1 bg-gray-100 rounded">
            »
          </button>
        </div>

      </div>

      {/* DIAS SEMANA */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
        {diasSemana.map((d)=>(
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DIAS */}
      <div className="grid grid-cols-7 gap-2">

        {dias.map((dia,i)=>{

          const isHoje =
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear();

          return(
            <div
              key={i}
              className={`h-10 flex items-center justify-center rounded-full
              ${isHoje ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-100"}
              `}
            >
              {dia}
            </div>
          )

        })}

      </div>

    </div>

  );
}