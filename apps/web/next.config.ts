import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  turbopack: {
    // Garante que o Turbopack não suba níveis acima da pasta do projeto
    root: ".", 
  },
};

export default nextConfig;