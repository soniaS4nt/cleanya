import { NextResponse, NextRequest } from 'next/server'

//aqui se obtiene un doc por id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json(
      { data: '', message: `Obteniendo reserva ${params.id}` },
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
