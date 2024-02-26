//import AcmeLogo from '@/app/ui/acme-logo';
//import LoginForm from '@/app/ui/login-form';
import LoginForm from '@/components/login-form'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'login',
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full text-white text-2xl items-center justify-center rounded-lg bg-tremor-brand p-3 ">
          <p className="font-bold">Inicia sesión</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm">
          ¿Aún no tienes una cuenta?{' '}
          <Link href={'/auth/signUp'}>
            <span className="text-tremor-brand font-bold text-sm">
              Regístrate
            </span>
          </Link>
        </p>
      </div>
    </main>
  )
}
