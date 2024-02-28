import { dbConnect } from '@/lib/mongodb'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextRequest } from 'next/server'
import bookingPaymentModel from '@/models/bookingPayment'
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.YOUR_ACCESS_TOKEN!,
})
export async function POST(request: NextRequest) {
  try {
    dbConnect()
    const body = await request
      .json()
      .then((data) => data as { data: { id: string } })
    // sguridad en prod
    const secret = request.headers.get('x-signature-id')
    if (secret !== process.env.SECRET_KEY_MP) {
      return Response.json({ succes: false })
    }

    const payment = await new Payment(client).get({ id: body.data.id })
    const bookingPayment = {
      id: payment.id,
      amount: payment.transaction_amount,
      message: payment.description,
    }
    console.log({ payment })

    //aqui estoy mandando la ruesta d ela api de mercado , donde ya se realizo el pago

    //TODO: asegurarse de que no exista en la db antes de enviarlo para no duplicar
    await bookingPaymentModel.create(bookingPayment)
    //hay que devolver un 200 para que no se duplique
    return Response.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    })
  }
}
