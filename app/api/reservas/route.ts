import { NextResponse, NextRequest } from 'next/server'
import appoiments, { IAppointment } from '@/models/appoiments'
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
    const data: IAppointment = await request.json()
    const res = await appoiments.create({
      fechaHora: { fecha: data.fechaHora.fecha, hora: data.fechaHora.hora },
      pago: 'esto es ficticio',
      detalles: {
        direccion: {
          adicionales: data.detalles.direccion.adicionales,
          calle: data.detalles.direccion.calle,
          comuna: data.detalles.direccion.comuna,
          numero: data.detalles.direccion.numero,
          region: data.detalles.direccion.region,
        },
        frecuencia: {
          id: data.detalles.frecuencia.id,
          value: data.detalles.frecuencia.value,
        },
        instrucciones: {
          id: data.detalles.instrucciones.id,
          value: data.detalles.instrucciones.value,
        },
      },
      requirements: {
        bathrooms: {
          id: data.requirements.bathrooms.id,
          value: data.requirements.bathrooms.value,
        },
        rooms: {
          id: data.requirements.rooms.id,
          value: data.requirements.rooms.value,
        },
        tipo: {
          id: data.requirements.tipo.id,
          value: data.requirements.tipo.value,
        },
      },
    })

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
