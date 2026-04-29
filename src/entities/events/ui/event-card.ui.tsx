import { Card, CardContent, Typography } from '@mui/material'
import { eventTypes } from '..'
import { Link } from 'react-router-dom'
import { API_URL } from '~shared/lib/api/apiClient'
import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const EventCard = ({ banner, title, slug, createdAt, status }: eventTypes.Event) => {
  const { t, i18n } = useTranslation()
  const imageUrl = banner ? (banner.startsWith('http') ? banner : API_URL + banner) : ''
  const formattedDate = new Date(createdAt).toLocaleDateString(i18n.language || undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card
      className="group relative flex h-full min-h-[420px] w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_20px_50px_rgba(42,33,114,0.12)]"
    >
      <Link to={`/news/event/${slug}`} className="absolute inset-0 z-20" />

      <div className="relative h-56 flex-shrink-0 overflow-hidden bg-primary">
        {imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary">
            <Calendar size={56} className="text-white/25" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />

        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary shadow-sm backdrop-blur">
          <Calendar size={14} className="text-green" />
          <span>{formattedDate}</span>
        </div>

        {status && (
          <div className="absolute right-4 top-4 z-10 rounded-lg bg-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-green/20">
            {status}
          </div>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-6">
        <Typography
          variant="h4"
          className="mb-5 text-left font-semibold leading-tight text-primary transition-colors duration-300 group-hover:text-green"
          sx={{ 
            fontSize: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <div className="mb-6 h-[2px] w-10 bg-green transition-all duration-300 group-hover:w-16" />

        <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary/65 transition-all group-hover:text-primary">
            {t('homepage.buttons.viewButton')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
