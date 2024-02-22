type Horario = {
  hours: string
  available: boolean
}

type HorasDisponibles = {
  date: string
  hours: Horario[]
}

function generarHorasDisponibles(): HorasDisponibles[] {
  const horasDisponibles: HorasDisponibles[] = []
  // Obtener la fecha actual
  const fechaActual = new Date() //o la ultima fecha de la base de datos

  // Iterar sobre los próximos 14 días laborables
  for (let i = 0; i < 14; i++) {
    // Agregar un día a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + 1)

    // Verificar si el día es laborable (lunes a sabado)
    const diaSemana = fechaActual.getDay()
    if (diaSemana >= 1 && diaSemana <= 6) {
      // 1: lunes, 6: sabado
      // Generar las horas disponibles para ese día
      const fechaString = fechaActual.toISOString()
      const horas: Horario[] = []

      // Definir las horas disponibles para la cita
      const horasCita = [
        { inicio: '09:00', fin: '11:00' }, // Ejemplo: cita de 9:00 a 11:00
        { inicio: '11:30', fin: '13:30' }, // Ejemplo: cita de 11:30 a 13:30 (con un margen de 30 minutos)
        { inicio: '14:00', fin: '16:00' }, // Ejemplo: cita de 14:00 a 16:00
      ]

      // Agregar las horas disponibles a la lista
      horasCita.forEach((cita) =>
        horas.push({ hours: `${cita.inicio}-${cita.fin}`, available: true })
      )

      horasDisponibles.push({ date: fechaString, hours: horas })
    }
  }

  return horasDisponibles
}
