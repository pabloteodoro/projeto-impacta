"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation"; 
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function LoginPage() {
  const router = useRouter(); 
  
 
  const [ra, setRa] = useState("");
  const [senha, setSenha] = useState("");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 

   
    if (ra === "2400741") {
     
      router.push("/");
    } else {
      alert("RA incorreto. Tente novamente.");
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0a1025]">
     
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#4a90e2",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      
      <div className="z-10 w-full max-w-md p-8 mx-4">
        <div className="relative rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-2">
               <h1 className="text-3xl font-bold text-white tracking-widest uppercase">IMPACTA</h1>
            </div>
            <p className="text-sm font-light text-gray-200">Acesso ao Portal Acadêmico</p>
            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
          </div>

         
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-white">RA</label>
              <input
                type="text"
                placeholder="Digite seu RA"
                value={ra}
                onChange={(e) => setRa(e.target.value)} 
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-white">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} 
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-blue-300 hover:text-blue-200 hover:underline">
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit" 
              className="w-full rounded bg-gradient-to-b from-blue-600 to-blue-800 py-3 text-base font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-700 active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}