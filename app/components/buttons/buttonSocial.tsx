interface ButtonSocialI {
  children: React.ReactNode
  title?: string
  href?: string
}

export default function ButtonSocial({ children, title, href }: ButtonSocialI) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 dark:hover:border-2 dark:hover:border-white focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
      >
        <p className={'mx-1'}>{title}</p>
        {children}
      </button>
    </a>
  )
}
