/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*', // Especifica la ruta o patrón de ruta para la cual aplicar estas cabeceras CORS
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://sandbox.mercadopago.cl', // Dominio de la API de Mercado Pago en el entorno de pruebas (sandbox)
          },
          // Otros encabezados CORS...
        ],
      },
    ]
  },
  env: {
    NEXT_PUBLIC_BASE_API_URL: 'http://localhost:3000',
  },
}

export default nextConfig
