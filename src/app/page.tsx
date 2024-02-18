import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-2 lg:p-24 ">
      <h1 className="font-extrabold lg:text-5xl">¡Próximamente!</h1>
      <Image
        className=""
        src="/HeroIllustrationMobile.svg"
        alt="Hero"
        width={300}
        height={300}
        priority
      />
    </main>
  )
}
