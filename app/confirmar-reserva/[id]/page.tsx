import ConfirmComponent from '@/components/confirmComponent'
import { updateStatusAppoiment } from '@/lib/data'
import { Status } from '@/lib/definitions'

type PageProps = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
type Response = { message: string; status: number }
export default async function ReservaPage({ params }: PageProps) {
  const { id } = params // Extrae el valor de slug de params

  const handleChangeStatus = async (
    id: string,
    state: Status
  ): Promise<Response> => {
    'use server'

    const res: Response = await updateStatusAppoiment(id, state)
    return res
  }

  return <ConfirmComponent id={id} changeStatus={handleChangeStatus} />
}
