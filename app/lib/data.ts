import { revalidatePath, unstable_cache } from 'next/cache'

export async function getData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/horasDisponibles `,
      {
        cache: 'no-store', // next: { revalidate: 1000 }, sacar era para refrescar la dsata de la bd
      }
    )
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
