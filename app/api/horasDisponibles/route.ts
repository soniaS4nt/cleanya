import { dbConnect } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import hours from '@/models/hoursAvailable'

export async function GET(request: NextRequest) {
  dbConnect()
  try {
    const hoursAvailable = await hours.find()

    return NextResponse.json({ data: hoursAvailable }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function UPDATE(request: NextRequest) {
  try {
    const data = await request.json()
    const res = new hours(data)
    const newHours = await res.save()

    return NextResponse.json(
      { data: newHours, message: 'Creando reservas', status: 1 },
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
