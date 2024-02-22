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
      className={`bg-tremor-brand rounded-lg text-center py-5 w-full text-white font-semibold m-6 shadow-md ${className}`}
    >
      <button type="button">¡Reserva ahora!</button>
    </Link>
  )
}
