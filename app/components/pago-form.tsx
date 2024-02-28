import { TextInput } from '@tremor/react'
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation'

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.YOUR_ACCESS_TOKEN!,
})

export default async function PagoForm() {
  async function pagar(formData: FormData) {
    'use server'
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: 'servicio',
            title: formData.get('title') as string,
            quantity: 1,
            unit_price: Number(formData.get('total')),
          },
        ],
        back_urls: {
          success: 'https://cleanya-git-dev-sonias4nt.vercel.app/',
        },
      },
    })
    redirect(preference.sandbox_init_point!)
  }
  return (
    <form action={pagar}>
      <div className=" rounded-lg shadow-lg">
        <TextInput placeholder="detalle del servicio" name="title" />
      </div>
      <div className=" rounded-lg shadow-lg">
        <TextInput placeholder="" name="total" />
      </div>
      <button type="submit"> pagar</button>
    </form>
  )
}
