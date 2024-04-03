'use client'
import { useState } from 'react'
import { TableComponent, TableData } from '@/components/tableComponent'
import { Card, Divider, TextInput, Textarea } from '@tremor/react'
import { Badge } from '@tremor/react'
import dayjs from 'dayjs'
import { formattedPago } from '@/lib/utils'
import { RiEyeLine } from '@remixicon/react'
import { ModalComponent } from './modalComponent'
import clsx from 'clsx'
import { Booking, Direccion, IAppointment, State } from '@/lib/definitions'
import { COLORS } from '@/lib/constants'

export default function Table({ data }: { data: Booking[] }) {
  const [selectedData, setSelectedData] = useState<TableData[]>([]) // Estado para almacenar la data de los rows seleccionados
  const [openModal, setOpenModal] = useState(false)
  const [info, setInfo] = useState<any>(null)
  // Función de devolución de llamada para manejar la actualización de la data seleccionada
  const handleSelectedDataChange = (rows: TableData[]) => {
    setSelectedData(rows)
  }
  const datosFormateados = data?.map((item) => ({
    ...item,
    fecha: item.fecha ? dayjs(item.fecha).format('DD/MM/YYYY') : '',
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

  return (
    <>
      <Card className="flex flex-col justify-center  md:w-3/5">
        <TableComponent
          className="sm:p-5 p-1"
          headers={cabeceras}
          data={datosFormateados}
          totalPages={1}
          onPageChange={handleSelectedDataChange}
        />
      </Card>
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
