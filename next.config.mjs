/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
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
=======
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    })
    config.resolve.fallback = {
      'mongodb-client-encryption': false,
      aws4: false,
    }

    return config
>>>>>>> 3b77d0240d815e5f157b67090acc0862df238e99
  },
}

export default nextConfig
