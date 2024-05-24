import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'

export default function NumberPerPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handlePageParam = (newValue: string) => {
    const params = new URLSearchParams(searchParams)
    if (newValue) {
      params.set('per_page', newValue)
    } else {
      params.delete('per_page')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    handlePageParam(newValue)
  }
  const value = searchParams.get('per_page') || 5
  return (
    <div className="mx-2">
      <select
        value={value}
        onChange={handleChange}
        className={clsx(
          'border-gray-200 bg-blue-600 text-white rounded-full shadow-sm h-10 bg-none',
          { 'p-2': value === '10', 'pr-1': value === '5' || value === '8' }
        )}
      >
        <option value="5" className="bg-white text-black ">
          5
        </option>
        <option value="8" className="bg-white text-black">
          8
        </option>
        <option value="10" className="bg-white text-black">
          10
        </option>
      </select>
    </div>
  )
}
