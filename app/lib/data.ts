import { toast } from 'sonner'
import { API_URL } from './constants'

export async function getData() {
  try {
    const res = await fetch(`${API_URL}/api/horasDisponibles `, {
      cache: 'no-store', // next: { revalidate: 1000 }, sacar era para refrescar la dsata de la bd
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function postAppoiment(body: any) {
  try {
    const res = await fetch(`/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      toast.warning('Faltan campos por llenar', {
        position: 'bottom-center',
      })
    }

    // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
    const data = await res.json()
    return data // Devuelve los datos de respuesta si es necesario
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function senEmail(body: any) {
  try {
    const res = await fetch(`/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      toast.warning('', {
        position: 'bottom-center',
      })
    }

    // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
    const data = await res.json()
    return data // Devuelve los datos de respuesta si es necesario
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
