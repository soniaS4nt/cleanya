import { NextResponse, NextRequest } from 'next/server'
import appoiments, { IAppointment } from '@/models/appoiments'
import { appoimentMapper } from '@/lib/mappers/appoimentMapper'
import hours from '@/models/hoursAvailable'
import dayjs from 'dayjs'

export async function GET(request: Request) {
  try {
    return NextResponse.json(
      { data: '', message: 'Obteniendo reservas' },
      { status: 200 }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // 1 - Hago la reserva
    const createdAppointment = await appoiments.create(appoimentMapper(data))

    // 2 - Luego, con la fecha y hora que se está enviando al back, hago un match y pongo no disponible la hora
    const dataDate = data.fechaHora.fecha // Esto debe ser la fecha que se envía en la solicitud
    const dataDateFormatted = dayjs(dataDate).format('D/M/YYYY')

    const dataHours: any = data.fechaHora.hora // Esto debe ser la hora que se envía en la solicitud
    const noAvailable = await hours.findOneAndUpdate(
      { date: dataDateFormatted, 'hours.hours': { $in: dataHours } }, // Condiciones de búsqueda
      { $set: { 'hours.$[elem].available': false } }, // Actualización: Establece 'available' como false para las horas coincidentes
      { arrayFilters: [{ 'elem.hours': { $in: dataHours } }], new: true } // Filtro del array para actualizar solo las horas coincidentes
    )

    return NextResponse.json(
      { message: 'Creando reserva', status: 1 },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
