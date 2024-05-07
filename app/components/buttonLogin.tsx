/* export default function ButtonLogin<T extends string>({
  href,
  className,
  onClick,
}: {
  href: Route<T> | URL
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Link
      href={href}
      className={`border-tremor-brand border-2 rounded-lg text-center p-2 text-tremor-brand min-w-4 font-semibold m-6 shadow-md ${className}`}
    >
      <button type="button" onClick={onClick}>
        Inicia sessión
      </button>
    </Link>
  )
}
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // children: React.ReactNode
  className?: string
}

export default function ButtonLogin({ className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`border-tremor-brand border-2 rounded-lg text-center p-2 text-tremor-brand transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  min-w-4 font-semibold m-6 shadow-md ${className} `}
    />
  )
}
