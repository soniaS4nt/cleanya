'use client'
import React, { useState } from 'react'
import { Divider } from '@tremor/react'

type RectangleType = {
  id: number | null
  name: string
}

type Props = {
  title: string
  rectangles: RectangleType[]
}

export default function InfoComponet({ rectangles, title }: Props) {
  const [selected, setSelected] = useState<null | RectangleType>(null)

  return (
    <div className="m-2">
      <small className="font-semibold text-gray-400">{title}</small>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {rectangles?.map((rectangle) => (
          <div
            key={rectangle.id}
            className={`relative rounded-lg border border-gray-300 overflow-hidden shadow-lg cursor-pointer transition duration-300 ${
              selected === rectangle
                ? 'ring-2 ring-blue-500'
                : 'ring-transparent'
            }`}
            onClick={() => setSelected(rectangle)}
          >
            <div className="flex items-center justify-center h-full">
              <p className="p-2 text-xs md:text-base">{rectangle.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </div>
  )
}
