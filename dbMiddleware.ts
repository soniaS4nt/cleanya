import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'

export const dbMiddleware = async (
  handler: (req: NextRequest, res: NextResponse) => Promise<void>
) => {
  // Conectar a la base de datos
  await dbConnect()

  // Retornar un nuevo controlador de ruta que llamará al controlador original después de conectar la base de datos
  return async (req: NextRequest, res: NextResponse) => {
    await handler(req, res)
  }
}
