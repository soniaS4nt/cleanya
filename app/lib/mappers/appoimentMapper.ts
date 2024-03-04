import { IAppointment } from '@/models/appoiments'

export const appoimentMapper = (data: IAppointment) => ({
  fechaHora: { fecha: data.fechaHora.fecha, hora: data.fechaHora.hora },
  pago: 'esto es ficticio',
  detalles: {
    direccion: {
      adicionales: data.detalles.direccion.adicionales,
      calle: data.detalles.direccion.calle,
      comuna: data.detalles.direccion.comuna,
      numero: data.detalles.direccion.numero,
      region: data.detalles.direccion.region,
    },
    frecuencia: {
      id: data.detalles.frecuencia.id,
      value: data.detalles.frecuencia.value,
    },
    instrucciones: {
      id: data.detalles.instrucciones.id,
      value: data.detalles.instrucciones.value,
    },
  },
  requirements: {
    bathrooms: {
      id: data.requirements.bathrooms.id,
      value: data.requirements.bathrooms.value,
      price: data.requirements.bathrooms.price,
    },
    rooms: {
      id: data.requirements.rooms.id,
      value: data.requirements.rooms.value,
      price: data.requirements.rooms.price,
    },
    tipo: {
      id: data.requirements.tipo.id,
      value: data.requirements.tipo.value,
      price: data.requirements.tipo.price,
    },
  },
})
