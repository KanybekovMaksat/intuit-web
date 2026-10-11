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
      className="group relative flex h-full min-h-[420px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.28)]"
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

        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary">
          <Calendar size={14} className="text-green" />
          <span>{formattedDate}</span>
        </div>

        {status && !['active', 'published', 'enabled'].includes(status.trim().toLowerCase()) && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-green-dark px-3 py-1 text-xs font-semibold text-white">
            {status}
          </div>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-6">
        <Typography
          variant="h4"
          className="mb-5 text-left font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-primary"
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

        <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary/65 transition-all group-hover:text-primary">
            {t('homepage.buttons.viewButton')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
