'use client'

import { Action, BookingData } from '@/lib/definitions'
import { reducer } from '@/reducers/dataBooking'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'

// Define el tipo para el estado inicial
export interface InitialState {
  bookingData: BookingData
  dispatch: React.Dispatch<Action>
}

// Define el estado inicial
export const initialState: BookingData = {
  requirements: {
    rooms: null,
    bathrooms: null,
    tipo: null,
  },
  fechaHora: {
    fecha: null,
    hora: [],
  },
  pago: 0,
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
  client: {
    fullName: '',
    email: '',
    appointments: [],
  },
}

// Define el contexto para la información de reserva
const BookingContext = createContext<InitialState | undefined>(undefined)

// Hook personalizado para acceder al contexto de la información de reserva
export const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}

// Componente proveedor que envuelve la aplicación y proporciona el contexto de la información de reserva
export const BookingProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [bookingData, dispatch] = useReducer(reducer, initialState)

  return (
    <BookingContext.Provider value={{ bookingData, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}
