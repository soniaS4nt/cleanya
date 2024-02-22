import { NextResponse, NextRequest } from 'next/server'
import appoiments from '@/models/appoiments'
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
    const res = new appoiments(data)
    const newAppoiment = await res.save()
    console.log(newAppoiment)

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
