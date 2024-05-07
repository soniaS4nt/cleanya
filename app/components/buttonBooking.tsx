import type { Route } from 'next'
import Link from 'next/link'

export default function ButtonBooking<T extends string>({
  href,
  className,
}: {
  href: Route<T> | URL
  className: string
}) {
  return (
    <Link
      href={href}
      className={`bg-tremor-brand rounded-lg text-center py-5 w-full text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 font-semibold  m-6 shadow-md ${className}`}
    >
      <button type="button">¡Reserva ahora!</button>
    </Link>
  )
}
