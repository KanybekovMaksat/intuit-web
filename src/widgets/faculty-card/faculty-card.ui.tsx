import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { t } from 'i18next'

type FacultyCardProps = {
  instituteName: string
  programCount: number
  slug: string
  icon?: string
}

/** Institute tile: navy card, programme count, line icon fading into the corner. */
export const FacultyCard: React.FC<FacultyCardProps> = ({
  instituteName,
  programCount,
  slug,
  icon,
}) => {
  return (
    <Link
      to={`/institutes/${slug}/`}
      className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl bg-primary p-5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-24px_rgba(42,33,114,0.7)]"
      style={{
        backgroundImage:
          'radial-gradient(70% 90% at 100% 100%, rgba(0,149,111,0.5) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-8 h-[130px] w-[170px] object-contain opacity-30 invert transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <h3 className="relative max-w-[85%] text-lg font-semibold leading-snug">{instituteName}</h3>

      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium tabular-nums">
          {programCount} {t('homepage.programs')}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </div>
    </Link>
  )
}
