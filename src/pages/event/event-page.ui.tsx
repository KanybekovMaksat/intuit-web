import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { ChevronRight } from 'lucide-react'
import { eventQueries } from '~entities/events'
import { t } from 'i18next'
import { Loader } from '~shared/ui/loader'

export const EventPage = () => {
  const { slug } = useParams()
  const { data, isLoading, isError } = eventQueries.useGetEventDetail(slug || '')

  if (isLoading) return <Loader />
  if (isError || !data)
    return (
      <div className="py-20 text-center text-ink-soft">{t('homepage.eventError')}</div>
    )

  const event = data.data

  return (
    <article className="mx-auto mb-20 mt-5 max-w-[860px]">
      <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
          <li>
            <Link to="/" className="transition-colors hover:text-primary">
              {t('breadcrumbs.home', 'Главная')}
            </Link>
          </li>
          <ChevronRight size={14} aria-hidden className="text-ink-soft/60" />
          <li>{t('breadcrumbs.events', 'События')}</li>
        </ol>
      </nav>

      <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink text-balance md:text-[1.75rem]">
        {event.title}
      </h1>

      {event.createdAt && (
        <time className="mt-4 block text-sm font-medium tabular-nums text-ink-soft">
          {t('homepage.creationDate')} {dayjs(event.createdAt).format('DD.MM.YYYY')}
        </time>
      )}

      {event.banner && (
        <img
          src={event.banner}
          alt=""
          className="mt-8 aspect-[16/9] w-full rounded-3xl bg-mist object-cover sm:rounded-2xl"
        />
      )}

      <div
        className="prose-muit prose-wide mt-8"
        dangerouslySetInnerHTML={{ __html: event.description }}
      />
    </article>
  )
}
