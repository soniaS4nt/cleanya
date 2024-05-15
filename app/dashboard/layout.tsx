import { Toaster } from 'sonner'
import SideNav from '@/components/sideMenu/sidenav'
import '@/globals.css'
import { auth } from '@auth'
import Image from 'next/image'
import PerfilComponent from '@/components/perfilComponent'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const perfil = await auth()

  return (
    <html lang="es">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-2">
            {/* perfil */}
            <PerfilComponent
              name={perfil?.user?.name}
              image={perfil?.user?.image}
            />
            {children}
          </div>
          <Toaster richColors expand />
        </div>
      </body>
    </html>
  )
}
