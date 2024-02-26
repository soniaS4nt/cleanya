'use client'
import React from 'react'
import InfoComponent, { RectangleType } from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  TextInput,
  Textarea,
} from '@tremor/react'

export type Direccion = {
  region: string
  comuna: string
  calle: string
  numero: string
  adicionales: string
}
export interface DetailI {
  frecuencia: RectangleType | null
  direccion: Direccion
  instrucciones: RectangleType | null
}
export default function DetailsForm({ className }: { className: string }) {
  const { bookingData, setBookingData } = useBookingContext()

  const handleSelection = (data: RectangleType | string, field: string) => {
    if (data !== undefined) {
      setBookingData((prevData) => ({
        ...prevData,
        detalles: {
          ...prevData.detalles,
          [field]: data,
        },
      }))
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    const name = e.target.name
    setBookingData((prevData) => ({
      ...prevData,
      detalles: {
        ...prevData.detalles,
        direccion: {
          ...prevData.detalles.direccion,
          [name]: value,
        },
      },
    }))
  }
  const handleOnValue = (value: string, field: string) => {
    setBookingData((prevData) => ({
      ...prevData,
      detalles: {
        ...prevData.detalles,
        direccion: {
          ...prevData.detalles.direccion,
          [field]: value,
        },
      },
    }))
  }

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
      value: 'Otros...',
    },
  ]
  return (
    <div className={className}>
      <div>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Selecciona la frecuencia
        </p>
        <InfoComponent
          title="Frecuencia"
          rectangles={rectanglesFrecuency}
          name=""
          selected={bookingData.detalles?.frecuencia}
          setSelected={(data) => handleSelection(data, 'frecuencia')}
        />
      </div>
      <>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Agrega tu dirección y detalles extras
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className=" rounded-lg shadow-lg">
            <SearchSelect
              placeholder="Región"
              onValueChange={(value) => handleOnValue(value, 'region')}
            >
              <SearchSelectItem value="Coquimbo">Coquimbo</SearchSelectItem>
            </SearchSelect>
          </div>
          <div className=" rounded-lg shadow-lg">
            <SearchSelect
              placeholder="Comuna"
              onValueChange={(value) => handleOnValue(value, 'comuna')}
            >
              <SearchSelectItem value="La serena">La serena</SearchSelectItem>
              <SearchSelectItem value="Coquimbo">Coquimbo</SearchSelectItem>
            </SearchSelect>
          </div>
          <div className=" rounded-lg shadow-lg">
            <TextInput
              placeholder="Ingresa el nombre de la calle"
              onChange={handleChange}
              name="calle"
              maxLength={50}
            />
          </div>
          <div className=" rounded-lg shadow-lg">
            <TextInput
              placeholder="Ingresa el N° de la calle"
              onChange={handleChange}
              name="numero"
              maxLength={20}
            />
          </div>
        </div>
        <>
          <InfoComponent
            title="Instrucciones para entrar"
            rectangles={rectanglesInst}
            selected={bookingData.detalles?.instrucciones}
            setSelected={(data) => handleSelection(data, 'instrucciones')}
          />
          <small className="font-semibold text-gray-400 mx-2">
            Instrucciones adicionales
          </small>
          <Textarea
            placeholder="Ejemplo: --"
            className=""
            onChange={handleChange}
            name="adicionales"
            maxLength={150}
          />
        </>
      </>
    </div>
  )
}
