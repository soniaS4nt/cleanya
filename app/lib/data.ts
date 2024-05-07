import { toast } from 'sonner'
import { API_URL } from './constants'
import { dbConnect } from '@/lib/mongodb'
import appoiments from '@/models/appoinments'
import { unstable_noStore as noStore } from 'next/cache'
import appointmentState from '@/models/appointmentState'
import mongoose from 'mongoose'
import { Booking, BookingData } from './definitions'

export async function getData() {
  try {
    const res = await fetch(`${API_URL}/api/horasDisponibles `, {
      cache: 'no-store', // next: { revalidate: 1000 }, sacar era para refrescar la dsata de la bd
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function postAppoiment(body: BookingData) {
  try {
    const res = await fetch(`/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) {
      const errorData = await data // Lee el cuerpo de la respuesta para obtener los errores
      const errorMessage = errorData.errors[0].message || 'Error desconocido' //
      toast.warning(errorMessage, {
        position: 'top-center',
      })
    }

    // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function senEmail(body: BookingData, id: string) {
  try {
    const res = await fetch(`/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body, id }),
    })

    if (!res.ok) {
      toast.warning('', {
        position: 'bottom-center',
      })
    }

    // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
    const data = await res.json()
    return data // Devuelve los datos de respuesta si es necesario
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function fetchBookings() {
  noStore()
  dbConnect()
  try {
    const response = await appoiments.find({})

    const bookings: Booking[] = response.map((item) => ({
      id: item._id.toString(),
      estado: item.state || '',
      fecha: item?.fechaHora?.fecha,
      hora: item?.fechaHora?.hora || [''],
      pago: item?.pago || 0,
      direccion: item?.detalles?.direccion || '',
      frecuencia: item?.detalles?.frecuencia?.value || '',
      instrucciones: item?.detalles?.instrucciones?.value || '',
      habitaciones: item?.requirements?.rooms.value || '',
      baños: item?.requirements?.bathrooms?.value || '',
      tipo_limpieza: item?.requirements?.tipo?.value || '',
      fecha_creacion: (item as any).createdAt || '',
    }))
    return bookings
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function updateStatusAppoiment(id: string, status: string) {
  dbConnect()
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    //1-primero buscamos la reserva por el id y cambiamos el estado al nuevo
    const appointment = await appoiments.findOneAndUpdate(
      { _id: id },
      { state: status }
    )

    //FIXME: 2- buscamos en state por el appimentId y ponemos el nuevo estado (aqui hay un tema con previousState)
    const changeStateAppioiment = await appointmentState.findOneAndUpdate(
      { appointmentId: id },
      { newState: status }
    )
    return { message: 'success', status: 1 }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Error fetching data:', error)
    return { message: `${error}`, status: 0 }
  }
}
