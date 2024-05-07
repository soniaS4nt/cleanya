import { dbConnect } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import hoursavailable from '@/models/hoursAvailable'
import { auth } from '@auth'

export async function GET(request: NextRequest) {
  dbConnect()
  try {
    /*  const session = await auth() */

    /* if (session) { */
    // Do something with the session
    const hoursAvailable = await hoursavailable.find({
      'hours.available': true,
    })

    return NextResponse.json({ data: hoursAvailable }, { status: 200 })
    /*  }
   return NextResponse.json(
      { message: 'You must be signed in.' },
      { status: 401 }
    ) */
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
