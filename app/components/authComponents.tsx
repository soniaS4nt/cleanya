import Link from 'next/link'
import { signIn, signOut } from '@auth'
import ButtonLogin from './buttonLogin'

export function SignIn({
  ...props
}: { provider?: string } & React.ComponentProps<typeof ButtonLogin>) {
  return (
    <Link href={'/auth/login'}>
      <ButtonLogin {...props}>Inicia sessión</ButtonLogin>
    </Link>
  )
}

export function SignOut(props: React.ComponentProps<typeof ButtonLogin>) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="w-full"
    >
      <ButtonLogin className="" {...props}>
        Cierra sessión
      </ButtonLogin>
    </form>
  )
}
