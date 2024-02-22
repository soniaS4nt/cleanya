'use client'
import React from 'react'
import InfoComponent from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  TextInput,
  Textarea,
} from '@tremor/react'

export default function DetailsForm() {
  const { bookingData, setBookingData } = useBookingContext()

  const rectanglesFrecuency = [
    {
      id: 1,
      value: 'Una vez',
    },
    {
      id: 2,
      value: 'semanal',
    },
  ]
  const rectanglesInst = [
    {
      id: 1,
      value: 'Alguien en casa',
    },
    {
      id: 2,
      value: 'Conserje',
    },
    {
      id: 3,
      value: 'Llave escondida',
    },
    {
      id: 4,
      value: 'otro...',
    },
  ]
  return (
    <div>
      <div>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Selecciona la frecuencia
        </p>
        <InfoComponent
          title="Frecuencia"
          rectangles={rectanglesFrecuency}
          name=""
          selected={() => {}}
          setSelected={() => {}}
        />
      </div>
      <>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Agrega tu dirección y detalles extras
        </p>
        <div className="grid grid-cols-2 gap-2">
          <SearchSelect placeholder="Región" onValueChange={() => {}}>
            <SearchSelectItem value="Coquimbo">Coquimbo</SearchSelectItem>
          </SearchSelect>
          <SearchSelect placeholder="Comuna" onValueChange={() => {}}>
            <SearchSelectItem value="La serena">La serena</SearchSelectItem>
            <SearchSelectItem value="Coquimbo">Coquimbo</SearchSelectItem>
          </SearchSelect>
          <TextInput placeholder="Ingresa el nombre de la calle" />
          <TextInput placeholder="Ingresa el N° de la calle" />
        </div>
        <>
          <InfoComponent title="Instrucciones" rectangles={rectanglesInst} />
          <small className="font-semibold text-gray-400 mx-2">
            Instrucciones adicionales
          </small>
          <Textarea placeholder="Ejemplo: --" className="mx-2 max-w-lg" />
        </>
      </>
    </div>
  )
}
