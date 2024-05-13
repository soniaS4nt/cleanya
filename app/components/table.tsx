'use client'
import { useState } from 'react'
import { TableComponent, TableData } from '@/components/tableComponent'
import {
  Card,
  DateRangePickerValue,
  Divider,
  TextInput,
  Textarea,
} from '@tremor/react'
import { Badge } from '@tremor/react'
import dayjs from 'dayjs'
import { formattedPago } from '@/lib/utils'
import { RiEyeLine } from '@remixicon/react'
import { ModalComponent } from './modalComponent'
import clsx from 'clsx'
import { Booking, State, stateButtonDictionary } from '@/lib/definitions'
import { COLORS } from '@/lib/constants'
import GroupButtons from './buttons/groupButtons'
import { DateRangePickerHero } from './calendars'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Table({
  data = [],
  pages,
  states = [],
}: {
  data: Booking[]
  pages: number
  states: any[]
}) {
  const [selectedData, setSelectedData] = useState<TableData[]>([]) // Estado para almacenar la data de los rows seleccionados
  const [openModal, setOpenModal] = useState(false)
  const [info, setInfo] = useState<any>(null)
  const [dateRange, setDateRange] = useState<
    | {
        from: Date | null
        to: Date | null
      }
    | DateRangePickerValue
  >({ from: null, to: null })

  // Función de devolución de llamada para manejar la actualización de la data seleccionada
  const handleSelectedDataChange = (rows: TableData[]) => {
    setSelectedData(rows)
  }
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleParams(title: string | undefined, dateRange: any) {
    const params = new URLSearchParams(searchParams)
    if (title) {
      params.set('state', title)
    } else {
      params.delete('state')
    }
    // Agregar las fechas seleccionadas si están disponibles
    if (dateRange?.from) {
      params.set('startDate', dateRange.from.toISOString())
    } else {
      params.delete('startDate')
    }

    if (dateRange?.to) {
      params.set('endDate', dateRange.to.toISOString())
    } else {
      params.delete('endDate')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const datosFormateados = data?.map((item) => ({
    ...item,
    fecha:
      item.fecha instanceof Date ? dayjs(item.fecha).format('DD/MM/YYYY') : '',
    hora: item.hora[0],
    pago: formattedPago(item.pago),
    estado: (
      <Badge size="xs" color={COLORS[item.estado as State]}>
        {item.estado}
      </Badge>
    ),
    icono: (
      <button onClick={() => handleDetalleClick(item)}>
        <RiEyeLine />
      </button>
    ),
  }))
  const handleDetalleClick = (item: Booking) => {
    setOpenModal(true)
    setInfo(item)
  }
  const cabeceras = [
    { label: 'ID', key: 'id', visible: false },
    { label: 'Fecha reserva', key: 'fecha' },
    { label: 'Hora', key: 'hora' },
    { label: 'Total a pagar', key: 'pago' },
    { label: 'Estado', key: 'estado' },
    { label: 'Detalle', key: 'icono' },
  ]

  const matchedButtons = Object.keys(stateButtonDictionary).map(
    (spanishTitle) => {
      const englishTitle =
        stateButtonDictionary[
          spanishTitle as keyof typeof stateButtonDictionary
        ]
      // Buscar el resultado correspondiente en el array de resultados
      const match = states.find(({ _id }) => _id === englishTitle)

      // Si se encuentra un resultado, devolver el objeto con el título y el recuento
      if (match) {
        return { title: spanishTitle, items: match.count }
      } else {
        // Si no se encuentra un resultado, devolver el objeto con el título y el recuento igual a cero
        return { title: spanishTitle, items: 0 }
      }
    }
  )

  const handleRange = (value: any) => {
    setDateRange(value)
    handleParams(undefined, value)
  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center my-2">
        <GroupButtons
          buttons={matchedButtons}
          key={'buttons'}
          onClick={(title) => handleParams(title, dateRange)}
        />
        <DateRangePickerHero onValueChange={(value) => handleRange(value)} />
      </div>
      <TableComponent
        className="sm:p-5 p-1"
        headers={cabeceras}
        data={datosFormateados}
        totalPages={pages}
        onPageChange={handleSelectedDataChange}
      />
      <ModalComponent
        className="max-w-2xl"
        onOpen={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center">
                <p className="mr-2">Región</p>
                <TextInput
                  placeholder=""
                  type="text"
                  name="region"
                  value={info?.direccion?.region}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">Comuna</p>
                <TextInput
                  placeholder=""
                  type="text"
                  name="comuna"
                  value={info?.direccion?.comuna}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">Calle</p>
                <TextInput
                  type="text"
                  placeholder=""
                  name="calle"
                  value={info?.direccion?.calle}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">N°</p>
                <TextInput
                  type="text"
                  placeholder=""
                  name="numero"
                  value={info?.direccion?.numero}
                  disabled
                />
              </div>

              <div
                className={clsx(
                  info?.direccion?.adicionales ? 'flex items-center' : 'hidden'
                )}
              >
                <p className="mr-2">Adicional</p>
                <Textarea
                  className="w-full"
                  name="adicionales"
                  placeholder=""
                  value={info?.direccion?.adicionales}
                  disabled
                />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center">
                <p className="mr-2">Frecuencia</p>
                <TextInput
                  type="text"
                  name="frecuencia"
                  placeholder=""
                  value={info?.frecuencia}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">Habitaciones</p>
                <TextInput
                  type="text"
                  name="habitaciones"
                  placeholder=""
                  value={info?.habitaciones}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">Tipo de limpieza</p>
                <TextInput
                  type="text"
                  name="tipo_limpieza"
                  placeholder=""
                  value={info?.tipo_limpieza}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">Instrucciones</p>
                <TextInput
                  type="text"
                  placeholder=""
                  name="instrucciones"
                  value={info?.instrucciones}
                  disabled
                />
              </div>
            </div>
          </>
        }
      />
    </>
  )
}
