import type { Route } from 'next'
import Link from 'next/link'

export default function ButtonLogin<T extends string>({
  href,
  className,
}: {
  href: Route<T> | URL
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`border-tremor-brand border-2 rounded-lg text-center p-2 text-tremor-brand min-w-4 font-semibold m-6 shadow-md ${className}`}
    >
      <button type="button">Inicia sesión</button>
    </Link>
  )
}
