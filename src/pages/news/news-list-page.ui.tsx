import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewsCard, newsQueries } from '~entities/news'
import { facultyQueries } from '~entities/faculties'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { PageHero, SelectField, FilterSummary } from '~shared/ui/page'

const PAGE_SIZE = 30

type NewsItem = {
  id: number
  slug: string
  title: string
  banner: string
  categories?: { id: number; title: string }[]
}

export const NewsListPage = () => {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const listRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width:767px)')

  const category = params.get('cat') || ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  // One request per page: the server paginates and filters by category
  const { data, isLoading, isError, isFetching } = newsQueries.useGetNewsPage(
    page,
    category ? Number(category) : null
  )
  const { data: facultyData } = facultyQueries.useGetFaculties()

  const items = getApiList<NewsItem>(data?.data)
  const total = (data?.data as { count?: number } | undefined)?.count ?? items.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // Sections: institutes from the faculties list plus any other section seen on this page
  const sections = useMemo(() => {
    const map = new Map<number, string>()
    getApiList<{ id: number; subtitle: string }>(facultyData?.data).forEach((item) =>
      map.set(item.id, item.subtitle)
    )
    items.forEach((item) =>
      item.categories?.forEach((cat) => {
        if (!map.has(cat.id)) map.set(cat.id, cat.title.trim())
      })
    )
    return [...map.entries()]
  }, [facultyData, items])

  const update = (patch: Record<string, string>) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, value)
        else next.delete(key)
      })
      if (!('page' in patch)) next.delete('page')
      return next
    })

  const goToPage = (next: number) => {
    update({ page: next === 1 ? '' : String(next) })
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('newsPage.title', 'Все новости')}
        subtitle={
          !category && total
            ? t('newsPage.count', { defaultValue: 'Публикаций: {{count}}', count: total })
            : undefined
        }
      />

      <div ref={listRef} className="mt-10 scroll-mt-24">
        <div className="max-w-[460px]">
          <SelectField
            label={t('newsPage.category', 'Раздел')}
            value={category}
            onChange={(value) => update({ cat: value })}
            options={[
              { value: '', label: t('newsPage.allCategories', 'Все разделы') },
              ...sections.map(([id, title]) => ({ value: String(id), label: title })),
            ]}
          />
        </div>

        <FilterSummary
          text={
            isLoading
              ? ''
              : t('newsPage.found', { defaultValue: 'Найдено: {{count}}', count: total })
          }
          canReset={Boolean(category)}
          onReset={() => setParams({})}
        />

        <div className="mt-6">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="py-20 text-center text-ink-soft">{t('loading.error')}</p>
          ) : items.length === 0 ? (
            <div className="rounded-3xl bg-gray-light px-6 py-16 text-center">
              <p className="text-xl font-semibold text-ink">
                {t('newsPage.emptyTitle', 'Ничего не найдено')}
              </p>
              <button
                type="button"
                onClick={() => setParams({})}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-dark"
              >
                {t('newsPage.reset', 'Сбросить фильтры')}
              </button>
            </div>
          ) : (
            <ul
              className={`grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 transition-opacity ${
                isFetching ? 'opacity-60' : ''
              }`}
            >
              {items.map((item) => (
                <li key={item.slug}>
                  <NewsCard image={item.banner} title={item.title} description="" slug={item.slug} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {pages > 1 && (
          <div className="mt-10 flex w-full justify-center overflow-x-auto py-1">
            <Pagination
              count={pages}
              page={Math.min(page, pages)}
              onChange={(_, next) => goToPage(next)}
              size={isMobile ? 'small' : 'medium'}
              siblingCount={isMobile ? 0 : 1}
              sx={{
                '& .MuiPagination-ul': { flexWrap: 'nowrap', justifyContent: 'center' },
                '& .MuiPaginationItem-root': { color: '#2A2172' },
                '& .MuiPaginationItem-root.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#2A2172',
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
