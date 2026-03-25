import { Icon } from '@mui/material'

interface Props {
  title: string
  text: string
  icon: React.ElementType
  direction: 'top-left' | 'bottom-right'
  bgColor: 'bg-blue' | 'bg-green'
}

export const EducationFormCard = ({
  title,
  text,
  icon,
  direction,
  bgColor,
}: Props) => {
  const isTopLeft = direction === 'top-left'

  const clipPath = isTopLeft
    ? 'polygon(0 0, 100% 0, 0 100%)'
    : 'polygon(100% 100%, 0 100%, 100% 0)'

  const contentPosition = isTopLeft
    ? 'top-0 left-0 justify-start items-start text-left'
    : 'bottom-0 right-0 justify-end items-end text-right'

  return (
    <div
      className={`relative w-full h-full ${bgColor} shadow-2xl`}
      style={{
        clipPath,
        WebkitClipPath: clipPath,
      }}
    >
      <div
        className={`absolute ${contentPosition} flex flex-col gap-4 p-6`}
        style={{
          width: '60%',
          maxHeight: '70%',
        }}
      >
        {direction == 'top-left' ? (
          <div className="flex items-center gap-3">
            <div className="bg-white/30 p-3 rounded-full shadow-lg">
              <Icon component={icon} className="text-white" fontSize="medium" />
            </div>
            <h4 className="text-3xl lg:text-sm font-semibold text-white leading-snug tracking-wide">
              {title}
            </h4>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h4 className="text-3xl lg:text-sm font-semibold text-white leading-snug tracking-wide">
              {title}
            </h4>
            <div className="bg-white/30 p-3 rounded-full shadow-lg">
              <Icon component={icon} className="text-white" fontSize="medium" />
            </div>
          </div>
        )}

        <p className="text-md text-white/90 leading-relaxed font-light max-w-[70%] md:text-xs md:!max-w-[50px]">
          {text}
        </p>
      </div>
    </div>
  )
}
