import { dbConnect } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import hoursavailable from '@/models/hoursAvailable'

export async function GET(request: NextRequest) {
  dbConnect()
  try {
    const hoursAvailable = await hoursavailable.find({
      'hours.available': true,
    })

    return NextResponse.json({ data: hoursAvailable }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
