import Tooltip from './tooltipComponent'

export default function PerfilComponent({
  name,
  image,
}: {
  name: string | null | undefined
  image: string | null | undefined
}) {
  return (
    <div className=" flex justify-end md:h-auto border border-black m-2">
      <Tooltip content={name} direction="left">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
          {image ? (
            <img src={image} alt="perfil photo" width={40} height={40} />
          ) : (
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </div>
      </Tooltip>
    </div>
  )
}
