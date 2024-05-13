'use server'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { signIn } from '@auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'
import appointments from '@/models/appoinments'
import { dbConnect } from './mongodb'
import { appoimentMapper } from './mappers/appoimentMapper'
import clients from '@/models/clients'
import dayjs from 'dayjs'
import { clientMapper } from './mappers/clientMapper'
import hoursAvailable from '@/models/hoursAvailable'
import appointmentStates from '@/models/appointmentState'

// ...
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.YOUR_ACCESS_TOKEN!,
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function createReservation(data: any) {
  dbConnect()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // 1. Crear un nuevo appointment
    const createdAppointment = await appointments.create(
      [appoimentMapper(data)],
      {
        session,
      }
    )
    // primero busco si existe por appoimentId- ** en realidad siempre va a cambiar , tendré que buscar por el id del AppointmentState

    // si existe le cambio el estado pero solo si no es completed?

    // si no existe o es completed creo un nuevo estado
    await appointmentStates.create(
      [
        {
          appointmentId: createdAppointment[0]._id,
          previousState: 'pending',
          newState: 'pending', // Cambia este valor según sea necesario
        },
      ],
      {
        session,
      }
    )
    //busco si existe mi cleinte
    const existingClient = await clients
      .findOne({
        /*  fullName: data.client.fullName, */
        email: data.client.email,
      })
      .session(session)

    if (existingClient) {
      // Si el cliente existe, actualiza su appoimentId con el nuevo ID de la cita
      await clients
        .findOneAndUpdate(
          { _id: existingClient._id }, // Filtra por el ID del cliente existente
          { $push: { appointments: [createdAppointment[0]._id] } }, // Establece el nuevo ID de la cita en el campo appoimentId
          { new: true, session } //grega el nuevo ID de la cita al array appoimentId
        )
        .session(session)
    } else {
      //2. Crear un cliente con el appoimentid
      const createClient = await clients.create(
        [clientMapper(data, createdAppointment[0].id)],
        { session }
      )
    }

    // 3. Actualizar la disponibilidad de horas
    const dataDate = data.fechaHora.fecha // Debes asegurarte de formatear adecuadamente la fecha aquí
    const dataDateFormatted = dayjs(dataDate).format('D/M/YYYY')
    const dataHours = data.fechaHora.hora

    await hoursAvailable.findOneAndUpdate(
      { date: dataDateFormatted, 'hours.hours': { $in: dataHours } },
      { $set: { 'hours.$[elem].available': false } },
      {
        arrayFilters: [{ 'elem.hours': { $in: dataHours } }],
        new: true,
        session,
      }
    )
    await session.commitTransaction()
    session.endSession()
    return {
      id: createdAppointment[0]._id.toString(),
      status: 1,
      message: 'La reserva se creó correctamente',
    }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
}
