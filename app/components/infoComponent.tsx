'use client'
import { Divider } from '@tremor/react'
import React, { useState } from 'react'
type rectangleType = {
  id: number | null
  name: string
}
// Datos de los rectángulos

export default function InfoComponet({ rectangles, title }: any) {
  const [selected, setSelected] = useState<null | rectangleType>(null)

  return (
    <div className="m-2">
      <small className="font-semibold text-gray-400">{title}</small>
      <div className="grid grid-cols-4 gap-3">
        {rectangles?.map((rectangle) => (
          <div
            key={rectangle.id}
            className={`relative rounded-lg border border-gray-300 overflow-hidden shadow-lg cursor-pointer transition duration-300 ${
              selected === rectangle.id
                ? 'ring-2 ring-blue-500'
                : 'ring-transparent'
            }`}
            onClick={() => setSelected(rectangle.id)}
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
/* `p-4 rounded-lg shadow-lg cursor-pointer transition duration-300  */
