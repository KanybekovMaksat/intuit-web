import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LinkCardProps {
  title: string
  description?: string
  /** Internal route. */
  to?: string
  /** External address, opens in a new tab. */
  href?: string
  image?: string
  /** Fallback when there is no image. */
  icon?: React.ReactNode
  label?: string
}

const cardClass =
  'group flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(42,33,114,0.35)]'

/** Tile that links somewhere: image or icon, title, short text, arrow. */
export const LinkCard = ({ title, description, to, href, image, icon, label }: LinkCardProps) => {
  const { t } = useTranslation()
  const action = label || t('aboutPage.go', 'Перейти')

  const body = (
    <>
      <div className="flex items-start gap-4">
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-xl bg-gray-light object-cover"
          />
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug text-ink break-words">{title}</h3>
          {description && (
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-green-dark">
        {action}
        {href ? (
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ) : (
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {body}
      </a>
    )
  }
  return (
    <Link to={to || '/'} className={cardClass}>
      {body}
    </Link>
  )
}
