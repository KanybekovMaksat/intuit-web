import { staffTypes } from '..'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const StaffCard = ({ name, description, image, slug }: staffTypes.Staff) => {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/teachers/${slug}`)}
      className="group flex h-full w-full cursor-pointer gap-4 rounded-2xl border border-line bg-white p-4 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.25)] md:flex-col"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="h-[148px] w-[112px] shrink-0 rounded-xl bg-mist object-cover md:h-[200px] md:w-full"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{name}</h3>
          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-ink-soft">{description}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Узнать больше
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  )
}
