import { auth } from '@auth'

import { SignIn, SignOut } from './authComponents'

export default async function UserButton() {
  const session = await auth()

  if (!session?.user) return <SignIn />
  return (
    <div className="flex gap-2 items-center">
      <SignOut />
    </div>
  )
}
