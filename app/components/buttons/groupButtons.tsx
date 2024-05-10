'use client'
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  items?: number
}
interface GroupButtonsProps {
  buttons: ButtonProps[]
  onClick?: (title: string | undefined) => void
}
export default function GroupButtons({ buttons, onClick }: GroupButtonsProps) {
  return (
    <div className="inline-flex flex-wrap my-1" role="group">
      {buttons.map(({ title, items }, index) => {
        return (
          <button
            type="button"
            className={clsx(
              `px-4 py-2 text-xs md:text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`,
              {
                'rounded-s-lg': index === 0,
                'rounded-e-lg': index === buttons.length - 1,
              }
            )}
            onClick={() => onClick && onClick(title)}
            key={index}
          >
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {items}
            </span>
            {title}
          </button>
        )
      })}
    </div>
  )
}
