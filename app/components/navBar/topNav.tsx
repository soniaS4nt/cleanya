'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ButtonLogin from '../buttonLogin'
import { auth } from '../../../auth'

const links = [
  {
    icon: '',
    href: '/',
    name: 'Inicio',
  },
  {
    icon: '',
    href: '/aboutUs',
    name: 'Sobre nosotros',
  },
  {
    icon: '',
    href: '/aboutUs#contact',
    name: 'Contacto',
  },
]

export default function TopNav() {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 w-full z-10 mb-4 shadow">
      {/* Icono de menú para dispositivos móviles */}
      <div className="flex sm:hidden  flex-row justify-between bg-white">
        <Image
          src="/logo.svg"
          alt=""
          width={100}
          height={100}
          className="object-contain my-5 mx-5"
        />
        <button
          onClick={toggleMobileMenu}
          className="text-primary-dark focus:outline-none"
        >
          {!isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 m-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 m-2 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="bg-white h-16 w-full hidden sm:flex gap-0 flex-row justify-between items-center">
        <Image
          src="/logo.svg"
          alt=""
          width={100}
          height={100}
          className="mx-16"
        />
        <div className="flex items-center mx-16">
          {links.map(({ href, name }) => (
            <Link
              href={href}
              key={name}
              className={`font-bold inline mx-2 text-primary border-link border-opacity-0 hover:text-blue-700 transition-transform duration-200 ease-in-out hover:scale-110
                  ${href === activeSection ? 'text-blue-700' : ''}`}
            >
              {name}
            </Link>
          ))}
          <ButtonLogin href={'/auth/login'} key={'btn'} />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className={
            'fixed inset-0  z-50 flex flex-col sm:hidden py-5 mt-16 bg-white'
          }
        >
          {links.map(({ href, name }) => (
            <Link
              href={href}
              key={name}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-2xl font-extrabold justify-center items-center m-2 flex p-2'
                  ${href === activeSection ? 'text-blue-700' : ''}`}
            >
              {name}
            </Link>
          ))}

          <ButtonLogin
            href={'/auth/login'}
            key={'btn'}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      )}
    </nav>
  )
}
