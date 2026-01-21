/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Permite que o deploy avance mesmo com os avisos de <img> que viste
      ignoreDuringBuilds: true,
    },
    images: {
      // Se decidires usar o componente <Image /> do Next.js no futuro,
      // esta configuração é obrigatória para carregar fotos do Imgur
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          pathname: '/**',
        },
      ],
    },
  }
  
  export default nextConfig;