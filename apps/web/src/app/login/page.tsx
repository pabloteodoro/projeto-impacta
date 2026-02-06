"use client";

import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Image from "next/image"; 
import { Lock, User } from "lucide-react"; 

export default function LoginPage() {
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0a1025]">

      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent", 
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 140, links: { opacity: 1 } },
              push: { quantity: 4 },
            },
          },
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
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />


      <div className="z-10 w-full max-w-md p-8 mx-4">
     
        <div className="relative rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          
          
          <div className="mb-8 flex flex-col items-center text-center">
           
           <div className="mb-4 h-12 w-48 relative"> 
               
               <Image src="/logo-impacta.png" alt="Logo" fill className="object-contain" />
               
            </div>
            <p className="text-sm font-light text-gray-200">Acesso ao Portal Acadêmico</p>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
          </div>

          
          <form className="space-y-6">
            
           
            <div className="space-y-2">
              <label htmlFor="ra" className="block text-sm font-bold text-white">
                RA
              </label>
              <input
                id="ra"
                type="text"
                placeholder="Digite seu RA"
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
              />
            </div>

            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-white">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
              />
            </div>

          
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-300 hover:text-blue-200 hover:underline">
                Esqueci minha senha
              </a>
            </div>

           
            <button
              type="button"
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