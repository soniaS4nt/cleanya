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
  // Obtener la fecha actual AQUI DEBERIA SER LA ULTIMA FEHA DE LA BD
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

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
export const formattedPago = (pago: number) =>
  pago?.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })

// Función para verificar si una fecha está disponible
function isDateAvailable(date: Date, availableDates: string[]): boolean {
  // Convierte la fecha a formato 'D/M/YYYY' para comparar
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`

  return availableDates.includes(formattedDate)
}

// Genera todas las fechas del año calendario (por ejemplo, 2024)
function generateCalendarDates(year: number): Date[] {
  const startDate = new Date(year, 0, 1) // 1 de enero
  const endDate = new Date(year, 11, 31) // 31 de diciembre

  const calendarDates: Date[] = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    calendarDates.push(currentDate)
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Siguiente día
  }

  return calendarDates
}

// Genera todas las fechas del año calendario 2024
const calendarYear = 2024
const allCalendarDates = generateCalendarDates(calendarYear)

// Filtra las fechas disponibles
export const filteredDates = (availableDates: string[]) =>
  allCalendarDates.filter((date) => !isDateAvailable(date, availableDates))
