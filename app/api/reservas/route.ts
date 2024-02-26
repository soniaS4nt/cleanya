import { NextResponse, NextRequest } from 'next/server'
import appointment, { IAppointment } from '@/models/appoiments'
import { appoimentMapper } from '@/lib/mappers/appoimentMapper'
import hoursavailable from '@/models/hoursAvailable'
import dayjs from 'dayjs'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/mongodb'
import { auth } from '../../../auth'

export async function POST(request: NextRequest) {
  dbConnect()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const sessionAuth = await auth()
    if (sessionAuth) {
      const data = await request.json()

      // 1. Crear un nuevo appointment
      const createdAppointment = await appointment.create(
        [appoimentMapper(data)],
        {
          session,
        }
      )

      // 2. Actualizar la disponibilidad de horas
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
        { message: 'Creando reserva', status: 1 },
        { status: 201 }
      )
    }
    return NextResponse.json(
      { message: 'You must be signed in.' },
      { status: 401 }
    )
  } catch (error) {
    await session.abortTransaction()
    session.endSession()

    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
