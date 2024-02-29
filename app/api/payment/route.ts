import { dbConnect } from '@/lib/mongodb'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextRequest, NextResponse } from 'next/server'
import bookingPaymentModel from '@/models/bookingPayment'
// Agrega credenciales
const accessToken = process.env.YOUR_ACCESS_TOKEN
const client = new MercadoPagoConfig({
  accessToken: accessToken!,
})
export async function POST(request: NextRequest) {
  try {
    // Conectar a la base de datos
    await dbConnect()

    const body = await request
      .json()
      .then((data) => data as { data: { id: string } })

    // Configurar los headers

    // Obtener información del pago
    const payment = await new Payment(client).get({ id: body.data.id })

    // Crear objeto para almacenar en la base de datos
    const bookingPayment = {
      id: payment.id,
      amount: payment.transaction_amount,
      message: payment.description,
    }

    // Verificar si ya existe en la base de datos antes de duplicar
    const existingPayment = await bookingPaymentModel.findOne({
      id: bookingPayment.id,
    })
    if (!existingPayment) {
      // Guardar en la base de datos
      await bookingPaymentModel.create(bookingPayment)
    } else {
      console.log('El pago ya existe en la base de datos.')
    }

    // Devolver una respuesta exitosa
    return NextResponse.next({
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error: any) {
    console.error(error)
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }
}
