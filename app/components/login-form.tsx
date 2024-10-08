'use client'

import { Button } from './buttons/button'
import ArrowRightIcon from '@/components/icons/arrowRigth'
import { RiAtLine, RiEye2Line, RiEyeCloseLine } from '@remixicon/react'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions'
import { useState } from 'react'

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [show, setShow] = useState(false)
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Correo
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                required
              />
              <RiAtLine className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="Ingresa tu contraseña"
                required
                minLength={6}
              />

              {/* agregar un eye icon que se pueda ver la contraseña si es show = true (type="text")si no (type="password")  */}
              <button
                type="button"
                className=" absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <RiEye2Line className="w-4 h-4" />
                ) : (
                  <RiEyeCloseLine className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {/*  <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Ingresar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}
