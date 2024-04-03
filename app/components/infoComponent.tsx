import { RectangleType } from '@/lib/definitions'

type Props = {
  title: string
  rectangles: RectangleType[]
  name?: string
  selected: RectangleType | null // Nuevo prop para mantener la selección
  setSelected: (rectangle: RectangleType) => void // Función para actualizar la selección
}

export default function InfoComponent({
  rectangles,
  title,
  selected,
  setSelected,
}: Props) {
  const handleClick = (rectangle: RectangleType) => {
    setSelected(rectangle) // Actualiza la selección en el componente padre
  }

  return (
    <div className="m-2">
      <small className="font-semibold text-gray-400">{title}</small>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rectangles?.map((rectangle) => (
          <div
            key={rectangle.id}
            className={`relative rounded-lg border border-gray-300 overflow-hidden shadow-lg cursor-pointer transition duration-300 ${
              selected?.id === rectangle.id
                ? 'ring-2 ring-blue-500'
                : 'ring-transparent'
            }`}
            onClick={() => handleClick(rectangle)}
          >
            <div className="flex items-center justify-center h-full">
              <p className="p-2 text-xs md:text-base">{rectangle.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
