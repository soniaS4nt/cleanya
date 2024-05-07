import TopNav from './navBar/topNav'
import UserButton from './userButton'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-10 shadow  bg-white">
      <div className="flex items-center justify-between">
        <TopNav />
        <UserButton />
      </div>
    </header>
  )
}
