'use client'
import { DetailI } from '@/components/details-form'
import { RequerimientosI } from '@/components/infoComponent'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'

// Define el tipo para los datos recopilados en las pestañas
export type BookingData = {
  requerimientos: RequerimientosI
  detalles: DetailI
  fecha: string | null
  hora: string | null
  pago: string | null
}

export interface InitialState {
  bookingData: BookingData
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>
}

export const initialState: InitialState = {
  bookingData: {
    requerimientos: {
      habitaciones: null,
      baños: null,
      tipo: null,
    },
    fecha: '',
    hora: '',
    pago: '',
    detalles: {
      frecuencia: null,
      direccion: {
        region: '',
        comuna: '',
        calle: '',
        numero: '',
        adicionales: '',
      },
      instrucciones: null,
    },
  },
  setBookingData: () => {},
}
// Crea el contexto para la información de reserva
const BookingContext = createContext<InitialState>(initialState)

// Hook personalizado para acceder al contexto de la información de reserva
export const useBookingContext = () => useContext(BookingContext)

// Componente proveedor que envuelve la aplicación y proporciona el contexto de la información de reserva
export const BookingProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [bookingData, setBookingData] = useState<BookingData>(
    initialState.bookingData
  )

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  )
}
