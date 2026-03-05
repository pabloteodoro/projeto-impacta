"use client";

import { useCallback, useState, useRef } from "react";
import Image from "next/image";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ReCAPTCHA from "react-google-recaptcha";
import { loginAction } from "./actions";

export default function LoginPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
            move: { enable: true, speed: 1 },
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
            <div className="relative mb-2 h-16 w-64">
              <Image
                src="/logo-impacta.png"
                alt="Faculdade Impacta"
                fill
                sizes="256px"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
          </div>

         
          <form
            action={async (formData: FormData) => {
              if (!captchaToken) {
                alert("Confirme o captcha.");
                return;
              }

              setLoading(true);
              await loginAction(formData);
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-bold text-white">
                RA
              </label>
              <input
                type="text"
                name="ra"
                placeholder="Digite seu RA"
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-white">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                className="w-full rounded bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex justify-center py-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={
                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                }
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-gradient-to-b from-blue-600 to-blue-800 py-3 text-base font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}