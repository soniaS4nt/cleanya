import { generateHtml } from '@/components/templates/generateHtml'
import { BookingData } from '@/reducers/dataBooking'
import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
//nodemail
const PASS = process.env.PASS_NODEMAILER
const USER = process.env.USER_NODEMAILER
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: USER,
    pass: PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const mail = (data: BookingData) => ({
  from: 'cleanya.ayuda@gmail.com',
  to: data.client.email,
  subject: 'Limpieza reservada | cleanYA',
  html: generateHtml(data),
})

export async function POST(request: NextRequest) {
  const data: BookingData = await request.json()
  try {
    await transporter.sendMail(mail(data))

    return Response.json({ message: 'Correo enviado' })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
