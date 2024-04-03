import { Card } from '@tremor/react'
import Image from 'next/image'

export function CardPhoto({ src }: { src: string }) {
  return (
    <Card className="mx-auto max-w-xs sm:max-w-lg max-h-96">
      {/*  <img
        className="w-full h-full object-cover rounded-lg"
        alt={''}
        src={src}
          width={100}
        height={100}
      /> */}
      <p className=" m-2 text-center text-slate-400">Pronto</p>
    </Card>
  )
}
