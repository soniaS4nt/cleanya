import React from 'react'
import Link from 'next/link'

export default function ButtonBooking({ href }) {
  return (
    <Link
      href={href}
      className="bg-[#1A78F2] rounded-lg text-center py-5 w-full text-white font-semibold m-6 shadow-md"
    >
      <button type="button">¡Reserva ahora!</button>
    </Link>
  )
}
