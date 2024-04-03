'use client'

import { Response, Status } from '@/lib/definitions'
import { Card } from '@tremor/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ConfirmComponentProps {
  id: string
  changeStatus: (id: string, status: Status) => Promise<Response>
}

export default function ConfirmComponent({
  id,
  changeStatus,
}: ConfirmComponentProps) {
  const { push } = useRouter()
  const handleChangeStatus = async (status: Status) => {
    const estado = status === Status.Canceled ? 'cancelada' : 'confirmada'
    // Actualiza el estado para indicar que la reserva ha sido cancelada o confirmada
    //llamara a una funcion update donde cambiara el estado buscando por id
    const res = await changeStatus(id, status)

    if (res.status === 1) {
      toast.success(`Tu reserva ha sido ${estado}`, {
        position: 'top-center',
      })
      push(`/`)
    } else {
      toast.error(`intenta mas tarde`, {
        position: 'top-center',
      })
    }
  }

  return (
    <div className="flex flex-row h-screen m-2 my-80 justify-center">
      <Card className="flex flex-col justify-center md:w-3/5 h-3/5">
        <p className="p-10 text-center">Confirma tu limpieza</p>
        {/* este botón cambiará el estado a confirmado */}
        <div className="flex flex-col sm:flex-row">
          <button
            className={`bg-red-600 rounded-lg text-center py-5 sm:w-full text-white font-semibold m-6 shadow-md`}
            onClick={() => handleChangeStatus(Status.Canceled)}
          >
            Cancelar{''}
          </button>
          <button
            className={`bg-tremor-brand rounded-lg text-center py-5 sm:w-full text-white font-semibold m-6 shadow-md`}
            onClick={() => handleChangeStatus(Status.Reserved)}
          >
            Confirmar{' '}
          </button>
        </div>
      </Card>
    </div>
  )
}
