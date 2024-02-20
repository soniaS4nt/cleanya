import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
export async function GET(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('bookings')
    const movies = await db
      .collection('hoursAvaible')
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray()

    /* const res = JSON.stringify(movies)
     return new Response(res, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }) */
    return NextResponse.json({ data: movies }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
