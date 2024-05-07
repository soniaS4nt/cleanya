import { ZodError, z } from 'zod'
import { BookingData } from '@/lib/definitions'

// Definir el esquema de los datos de reserva utilizando Zod
const BookingDataSchema = z.object({
  client: z.object({
    fullName: z
      .string()
      .min(8, { message: 'Debes poner tu nombre y apellido' })
      .max(50),
    email: z.string().email({ message: 'Correo no válido' }), // Validación de formato de correo electrónico
  }),
})

// Mapper con validaciones utilizando Zod y safeParse
export const clientMapper = (data: BookingData, id: string) => {
  const result = BookingDataSchema.safeParse(data)

  if (result.success) {
    // Los datos cumplen con el esquema, se pueden utilizar
    return {
      fullName: result.data.client.fullName,
      email: result.data.client.email,
      appointmentId: [id],
    }
  } else {
    // Los datos no cumplen con el esquema, se lanza una excepción con los errores de validación
    throw new ZodError(result.error.errors)
  }
}
