import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export type Crumb = { label: string; to?: string }

interface PageHeroProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** Parent pages. The current page is the title itself, so it is not repeated here. */
  crumbs?: Crumb[]
  /** Illustration or photo shown on the right, scaled to fit. */
  image?: string
  imageAlt?: string
  /** Buttons under the text. */
  actions?: React.ReactNode
  /** Extra rows under the text (facts, chips). */
  children?: React.ReactNode
  /** Tighter hero for text-only pages. */
  compact?: boolean
}

/**
 * Shared top block for inner pages: navy panel, breadcrumb trail, headline.
 * Same shape language as the home hero so the site reads as one product.
 */
export const PageHero = ({
  title,
  subtitle,
  crumbs = [],
  image,
  imageAlt = '',
  actions,
  children,
  compact,
}: PageHeroProps) => {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const trail: Crumb[] = [{ label: t('breadcrumbs.home', 'Главная'), to: '/' }, ...crumbs]

  return (
    <header
      className="relative mt-5 overflow-hidden rounded-3xl bg-primary text-white sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(50% 90% at 92% 110%, rgba(0,149,111,0.5) 0%, rgba(0,149,111,0) 70%), radial-gradient(40% 70% at 0% 0%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%)',
      }}
    >
      <div
        className={`grid items-center gap-8 px-12 xll:px-8 lg:px-6 sm:px-4 ${
          image ? 'grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:grid-cols-1' : 'grid-cols-1'
        } ${compact ? 'py-9 sm:py-7' : 'py-12 lg:py-9 sm:py-7'}`}
      >
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              })}
        >
          <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-white/70">
              {trail.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight size={14} aria-hidden className="text-white/40" />}
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className="rounded-full px-1 transition-colors duration-200 hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1
            className={`mt-5 max-w-[24ch] font-semibold leading-[1.08] tracking-tight text-balance ${
              compact
                ? 'text-[2.5rem] lg:text-4xl md:text-[1.9rem] sm:text-[1.6rem]'
                : 'text-[3rem] lg:text-[2.5rem] md:text-[2rem] sm:text-[1.65rem]'
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-white/80 md:text-base">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
          {actions && <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>}
        </motion.div>

        {image && (
          <div className="flex justify-end lg:hidden">
            <img
              src={image}
              alt={imageAlt}
              className="max-h-[280px] w-auto max-w-full object-contain"
            />
          </div>
        )}
      </div>
    </header>
  )
}
