'use client'
import React from 'react'
import InfoComponent from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'
import {
  SearchSelect,
  SearchSelectItem,
  TextInput,
  Textarea,
} from '@tremor/react'
import { RectangleType } from '@/lib/definitions'

export default function DetailsForm({ className }: { className: string }) {
  const { bookingData, dispatch } = useBookingContext()

  const handleSelection = (data: RectangleType | string, field: string) => {
    if (data !== undefined) {
      // Envía una acción para actualizar los detalles en el estado de la reserva
      dispatch({
        type: 'CREATE_BOOKING_DATA',
        payload: {
          detalles: {
            ...bookingData.detalles,
            [field]: data,
          },
        },
      })
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    const name = e.target.name
    dispatch({
      type: 'CREATE_BOOKING_DATA',
      payload: {
        detalles: {
          ...bookingData.detalles,
          direccion: {
            ...bookingData.detalles.direccion,
            [name]: value,
          },
        },
      },
    })
  }
  const handleOnValue = (value: string, field: string) => {
    dispatch({
      type: 'CREATE_BOOKING_DATA',
      payload: {
        detalles: {
          ...bookingData.detalles,
          direccion: {
            ...bookingData.detalles.direccion,
            [field]: value,
          },
        },
      },
    })
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
            value={bookingData.detalles?.direccion?.adicionales}
            onChange={handleChange}
            name="adicionales"
            maxLength={150}
          />
        </>
      </>
    </div>
  )
}
