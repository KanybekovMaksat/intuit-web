import { t } from 'i18next'
import { newsQueries, NewsRecomendationCard } from '~entities/news'
import { Loader } from '~shared/ui/loader'

const RAIL_COUNT = 5

type NewsItem = { id: number; title: string; date: string; slug: string }

export const NewsRecomendationList = () => {
  const { data, isLoading, isError, isSuccess } = newsQueries.useGetNews()

  if (isError) {
    return <div className="text-ink-soft">{t('loading.error')}</div>
  }
  if (isLoading) {
    return <Loader />
  }
  if (!isSuccess) return null

  const items = ((data?.data?.results || []) as NewsItem[]).slice(0, RAIL_COUNT)

  return (
    <ul className="grid gap-3">
      {items.map((news) => (
        <li key={news.id}>
          <NewsRecomendationCard title={news.title} date={news.date} slug={news.slug} />
        </li>
      ))}
    </ul>
  )
}
