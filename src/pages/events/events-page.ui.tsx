import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EventCard, eventQueries, eventTypes } from '~entities/events'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { PageHero, SearchField, SelectField, FilterSummary } from '~shared/ui/page'

const finishedStatuses = ['archive', 'archived', 'finished', 'completed', 'past', 'ended']

export const EventsPage = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = eventQueries.useGetEvents()
  const events = getApiList<eventTypes.Event>(data?.data)

  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('')
  const [sort, setSort] = useState<'new' | 'old'>('new')

  const hasFinished = events.some((event) => finishedStatuses.includes(String(event.status)))
  const hasActive = events.some((event) => !finishedStatuses.includes(String(event.status)))

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const list = events.filter((event) => {
      const done = finishedStatuses.includes(String(event.status))
      if (group === 'upcoming' && done) return false
      if (group === 'finished' && !done) return false
      if (needle && !event.title.toLowerCase().includes(needle)) return false
      return true
    })
    list.sort((a, b) =>
      sort === 'old'
        ? String(a.createdAt).localeCompare(String(b.createdAt))
        : String(b.createdAt).localeCompare(String(a.createdAt))
    )
    return list
  }, [events, query, group, sort])

  const hasFilters = Boolean(query || group || sort === 'old')
  const reset = () => {
    setQuery('')
    setGroup('')
    setSort('new')
  }

  return (
    <div className="mb-20">
      <PageHero compact title={t('eventsPage.title', 'Все мероприятия')} />

      <div className="mt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_220px_200px] gap-3 lg:grid-cols-2 md:grid-cols-1">
          <div className="flex lg:col-span-2 md:col-span-1">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={t('eventsPage.search', 'Поиск по названию')}
            />
          </div>
          {hasFinished && hasActive && (
            <SelectField
              label={t('eventsPage.status', 'Статус')}
              value={group}
              onChange={setGroup}
              options={[
                { value: '', label: t('eventsPage.allStatuses', 'Все мероприятия') },
                { value: 'upcoming', label: t('eventsPage.upcoming', 'Актуальные') },
                { value: 'finished', label: t('eventsPage.finished', 'Завершённые') },
              ]}
            />
          )}
          <SelectField
            label={t('eventsPage.sort', 'Сортировка')}
            value={sort}
            onChange={(value) => setSort(value === 'old' ? 'old' : 'new')}
            options={[
              { value: 'new', label: t('eventsPage.sortNew', 'Сначала новые') },
              { value: 'old', label: t('eventsPage.sortOld', 'Сначала старые') },
            ]}
          />
        </div>

        <FilterSummary
          text={
            isLoading
              ? ''
              : t('eventsPage.found', { defaultValue: 'Найдено: {{count}}', count: filtered.length })
          }
          canReset={hasFilters}
          onReset={reset}
        />

        <div className="mt-6">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="py-20 text-center text-ink-soft">{t('loading.error')}</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl bg-gray-light px-6 py-16 text-center">
              <p className="text-xl font-semibold text-ink">
                {events.length === 0
                  ? t('eventsPage.empty', 'Мероприятий пока нет')
                  : t('newsPage.emptyTitle', 'Ничего не найдено')}
              </p>
              {events.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-dark"
                >
                  {t('newsPage.reset', 'Сбросить фильтры')}
                </button>
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1">
              {filtered.map((event) => (
                <li key={event.slug}>
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
