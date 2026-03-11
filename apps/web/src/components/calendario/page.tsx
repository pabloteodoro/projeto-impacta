"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const diasSemana = ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"];

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function Calendar() {
  const hoje = new Date();

  const [dataAtual, setDataAtual] = useState(
    new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  );

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
  const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

  const dias = [];

  for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
    dias.push({
      dia: ultimoDiaMesAnterior - i,
      outroMes: true,
    });
  }

  for (let i = 1; i <= ultimoDiaMes; i++) {
    dias.push({
      dia: i,
      outroMes: false,
    });
  }

  let contador = 1;

  while (dias.length % 7 !== 0) {
    dias.push({
      dia: contador++,
      outroMes: true,
    });
  }

  function mudarMes(direcao: number) {
    setDataAtual(new Date(ano, mes + direcao, 1));
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h3 className="font-bold text-gray-700 text-sm sm:text-base">
          Calendário
        </h3>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
          <button
            onClick={() => mudarMes(-1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>

          <span>
            {meses[mes]} de {ano}
          </span>

          <button
            onClick={() => mudarMes(1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* DIAS DA SEMANA */}
      <div className="grid grid-cols-7 text-[10px] sm:text-xs text-gray-400 mb-2">
        {diasSemana.map((dia, index) => (
          <div key={index} className="text-center">
            {dia}
          </div>
        ))}
      </div>

      {/* DIAS */}
      <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">

        {dias.map((item, index) => {
          const isHoje =
            item.dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear() &&
            !item.outroMes;

          return (
            <div
              key={index}
              className="flex items-center justify-center h-8 sm:h-9 relative"
            >
              <span
                className={`
                ${
                  item.outroMes
                    ? "text-gray-300"
                    : "text-gray-700 hover:bg-gray-100"
                }
                ${isHoje ? "text-white z-10 font-bold" : ""}
                flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer
                `}
              >
                {item.dia}
              </span>

              {isHoje && (
                <div className="absolute w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs sm:text-sm text-blue-600 cursor-pointer font-semibold hover:underline">
        Ver Calendário Completo →
      </div>
    </div>
  );
}