import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import '@/globals.css'
import { Toaster } from 'sonner'
import FooterSection from '@/components/footerSection'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { BookingProvider } from '@/contexts/bookingsContext'
import Header from '@/components/header'
import WhatsaapButton from '@/components/buttons/whatsaapButton'

const joseFin = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { template: '%s | CleanYA', default: 'CleanYa App' },
  description: 'Empresa dedicada a la limpieza',
  metadataBase: new URL('https://cleanya.shop'),
  keywords: [
    'limpieza',
    'limpieza de alfombras',
    'servicio de limpieza',
    'limpieza profesional',
    'limpieza a domicilio',
    'empresa de limpieza',
    'limpieza de interiores',
    'limpieza de exteriores',
    'limpieza de hogar',
    'limpieza residencial',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${joseFin.className} antialiased`}>
        <Header />
        <BookingProvider>{children}</BookingProvider>
        <div className="fixed bottom-4 right-4 z-50">
          <WhatsaapButton />
        </div>
        <Toaster richColors expand />
        <FooterSection />
        <SpeedInsights />
      </body>
    </html>
  )
}
