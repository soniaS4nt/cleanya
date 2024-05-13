import { TEXT } from '@/lib/constants'
import { RiWhatsappLine } from '@remixicon/react'

export default function WhatsaapButton() {
  return (
    <button className="bg-white rounded-full shadow-xl">
      <a
        href={`http://wa.me/56956468634?text=${encodeURIComponent(TEXT)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiWhatsappLine className="h-10 w-10 m-2 text-3xl text-green-500" />
      </a>
    </button>
  )
}
