import { DatePickerValue } from '@tremor/react'
import { Dayjs } from 'dayjs'
import { ObjectId, Timestamp } from 'mongodb'
import { Date } from 'mongoose'

// Define una interfaz para los detalles de dirección
export interface Direccion {
  region: string
  comuna: string
  calle: string
  numero: string
  adicionales: string
}

// Define una interfaz para los tipos de rectángulo
export interface RectangleType {
  id: number
  value: string
  price?: number
}

// Define una interfaz para los datos de reserva
export interface ReservationData {
  fecha: DatePickerValue | null
  hora: string[]
}

// Define una interfaz para los requerimientos
export interface RequerimientosI {
  [key: string]: RectangleType | null
}

// Define una interfaz para los detalles
export interface DetailI {
  frecuencia: RectangleType | null
  direccion: Direccion
  instrucciones: RectangleType | null
}

// Define una interfaz para un cliente
export interface IClient {
  fullName: string
  email: string
  appointments: ObjectId[] // Array de ObjectIds de citas
}

// Define una interfaz para los datos de reserva y los requerimientos
export interface BookingData {
  requirements: RequerimientosI
  detalles: DetailI
  fechaHora: ReservationData
  pago: number
  client: IClient
}

// Define el tipo para la acción del reducer
export type Action =
  | { type: 'CREATE_BOOKING_DATA'; payload: Partial<BookingData> }
  | { type: 'CLEAN_BOOKING_DATA' }
  | { type: 'CALCULATE_TOTAL_PAYMENT' }

export type State = 'pending' | 'reserved' | 'canceled' | 'completed'
export enum Status {
  Pending = 'pending',
  Reserved = 'reserved',
  Canceled = 'canceled',
  Completed = 'completed',
}
// Define una interfaz para una cita
export interface IAppointment {
  id: string
  fechaHora: {
    fecha: Date
    hora: string[]
  }
  pago: number
  detalles: {
    frecuencia: RectangleType
    direccion: Direccion
    instrucciones: RectangleType
  }
  requirements: {
    rooms: RectangleType
    bathrooms: RectangleType
    tipo: RectangleType
  }
  state: State
}
/* export interface AppoimentWithCreatedAt extends IAppointment {
  createdAt: Date
} */
// Define una interfaz para las horas disponibles
export interface Hour {
  hours: string
  available: boolean
}

// Define una interfaz para los documentos de horas
export interface HoursDocument {
  date: string
  hours: Hour[] // Array de objetos de tipo Hour
}

export type ColorMap = {
  [key in State]: string
}

export type ReservationStatus = 0 | 1 // Por ejemplo, podrías tener 0 para cancelado, 1 para reservado, 2 para otro estado

export interface Response {
  message: string
  status: number
}

export interface UserI {
  email: string
  name?: string
  password?: any
}

export interface Booking {
  id: string
  estado: string
  fecha: Date
  hora: string[]
  pago: number
  direccion: Direccion
  frecuencia: string
  instrucciones: string
  habitaciones: string
  baños: string
  tipo_limpieza: string
  fecha_creacion: Timestamp
}
