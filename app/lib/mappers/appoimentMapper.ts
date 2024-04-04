import { ZodError, z } from 'zod'
import { IAppointment } from '../definitions'

// Define el esquema de validación con Zod
const AppointmentSchema = z.object({
  fechaHora: z
    .object(
      {
        fecha: z.string().datetime(),
        hora: z.array(z.string()),
      },
      { invalid_type_error: 'campos requerido' }
    )
    .required(),
  pago: z.number(),
  detalles: z
    .object(
      {
        frecuencia: z
          .object(
            {
              id: z.number(),
              value: z.string(),
            },
            { invalid_type_error: 'campos requerido' }
          )
          .required(),
        direccion: z
          .object(
            {
              region: z.string(),
              comuna: z.string(),
              calle: z.string(),
              numero: z.string(),
              adicionales: z.string().max(150).optional(),
            },
            { invalid_type_error: 'campos requerido' }
          )
          .required(),
        instrucciones: z
          .object(
            {
              id: z.number(),
              value: z.string(),
            },
            { invalid_type_error: 'campos requerido' }
          )
          .required(),
      },
      { required_error: 'campos requerido' }
    )
    .required(),
  requirements: z
    .object(
      {
        rooms: z.object(
          {
            id: z.number(),
            value: z.string(),
            price: z.number(),
          },
          { invalid_type_error: 'campos requerido' }
        ),
        bathrooms: z
          .object(
            {
              id: z.number(),
              value: z.string(),
              price: z.number(),
            },
            { invalid_type_error: 'campos requerido' }
          )
          .required(),
        tipo: z
          .object(
            {
              id: z.number(),
              value: z.string(),
              price: z.number(),
            },
            { invalid_type_error: 'campos requerido' }
          )
          .required(),
      },
      { required_error: 'campos requerido' }
    )
    .required(),
})

// Mapper con validaciones utilizando Zod
export const appoimentMapper = (data: IAppointment) => {
  const RequiredAppointmentSchema = AppointmentSchema.partial().merge(
    AppointmentSchema.pick({
      fechaHora: true, //hora no es requerido ??
      pago: true,
      detalles: true,
      requirements: true,
    }).required()
  )

  // Validar los datos de entrada utilizando el esquema de Zod
  const validatedData = AppointmentSchema.safeParse(data)
  if (validatedData.success) {
    // Acceder a los datos validados
    const { fechaHora, pago, detalles, requirements } = validatedData.data
    console.log(fechaHora.fecha)

    // Devolver los datos validados
    return {
      fechaHora: {
        fecha: fechaHora.fecha,
        hora: fechaHora.hora,
      },
      pago,
      detalles: {
        direccion: {
          adicionales: detalles.direccion.adicionales,
          calle: detalles.direccion.calle,
          comuna: detalles.direccion.comuna,
          numero: detalles.direccion.numero,
          region: detalles.direccion.region,
        },
        frecuencia: {
          id: detalles.frecuencia.id,
          value: detalles.frecuencia.value,
        },
        instrucciones: {
          id: detalles.instrucciones.id,
          value: detalles.instrucciones.value,
        },
      },
      requirements: {
        bathrooms: {
          id: requirements.bathrooms.id,
          value: requirements.bathrooms.value,
          price: requirements.bathrooms.price,
        },
        rooms: {
          id: requirements.rooms.id,
          value: requirements.rooms.value,
          price: requirements.rooms.price,
        },
        tipo: {
          id: requirements.tipo.id,
          value: requirements.tipo.value,
          price: requirements.tipo.price,
        },
      },
    }
  } else {
    // Los datos no cumplen con el esquema, se lanza una excepción con los errores de validación
    throw new ZodError(validatedData.error.errors)
  }
}
