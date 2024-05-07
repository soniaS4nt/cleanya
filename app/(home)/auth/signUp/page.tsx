//import AcmeLogo from '@/app/ui/acme-logo';
//import LoginForm from '@/app/ui/login-form';
import SignUpForm from '@/components/signUp-form'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'signUp',
}

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full text-white text-2xl items-center justify-center rounded-lg bg-tremor-brand p-3 ">
          <p className="font-bold">Registrate</p>
        </div>
        <SignUpForm />
        <p className="text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link href={'/auth/login'}>
            <span className="text-tremor-brand font-bold text-sm">
              Inicia sesión
            </span>
          </Link>
        </p>
      </div>
    </main>
  )
}
