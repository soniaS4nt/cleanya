import { NextResponse, NextRequest } from 'next/server'
import appointments from '@/models/appoinments'
import { appoimentMapper } from '@/lib/mappers/appoimentMapper'
import hoursavailable from '@/models/hoursAvailable'
import dayjs from 'dayjs'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import { auth } from '../../../auth'
import clients from '@/models/clients'
import { clientMapper } from '@/lib/mappers/clientMapper'
import { ZodError } from 'zod'
import appointmentStates from '@/models/appointmentState'

export async function POST(request: NextRequest) {
  dbConnect()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    /*   const sessionAuth = await auth()
    if (sessionAuth) { */
    const data = await request.json()

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
    const appointmentState = await appointmentStates.create(
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

    await hoursavailable.findOneAndUpdate(
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

    return NextResponse.json(
      {
        id: createdAppointment[0]._id.toString(),
        message: 'Reserva creada',
        status: 1,
      },
      { status: 201 }
    )
    /*  }
    return NextResponse.json(
      { message: 'You must be signed in.' },
      { status: 401 }
    ) */
  } catch (error) {
    await session.abortTransaction()
    session.endSession()

    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    } else {
      // Maneja cualquier otro tipo de error
      console.error(error)
      return NextResponse.json({ error: 'Internal Server Error' })
    }
  }
}
