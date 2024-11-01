/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/analyze',
          // destination: 'https://analizador-sintactico-back.onrender.com/analyze', // Ajusta esta URL
          destination: 'http://127.0.0.1:5000/analyze', // Asume que Flask está corriendo en el puerto 5000
          // destination: '/analyze', // Esto sigue apuntando a la ruta del backend
        },
      ]
    },
    // Asegúrate de que el output sea 'standalone' para Vercel
    // output: 'standalone',
}
  
  export default nextConfig;