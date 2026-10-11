import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Link2, Check } from 'lucide-react'
import { t } from 'i18next'
import { newsQueries, NewsCard } from '~entities/news'
import { Loader } from '~shared/ui/loader'
import Fancybox from '~shared/ui/fancybox/Fancybox'
import { getApiList } from '~shared/lib/api/getApiList'
import type { NewsListItem } from '~entities/news/news.api'

type GalleryImage = { id?: number; image: string; title?: string }
type Category = { id: number; slug: string; title: string }

const WORDS_PER_MINUTE = 180

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const shareButton =
  'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-primary/40'

export const NewsPage = () => {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)

  const { data: newsData, isLoading, isError } = newsQueries.useGetNewsDetail(slug || '')

  const news = newsData?.data
  const categories = ((news?.categories || []) as unknown as Category[]).filter(
    (cat) => typeof cat === 'object' && cat !== null
  )
  const gallery = ((news?.images || []) as unknown as GalleryImage[]).filter((item) => item?.image)

  // One extra request, only after the post is known: first page of its section
  const { data: pageData } = newsQueries.useGetNewsPage(
    1,
    categories[0]?.id ?? null,
    Boolean(news)
  )
  const sectionNews = getApiList<NewsListItem>(pageData?.data)

  const readingMinutes = useMemo(() => {
    const words = stripTags(news?.description || '').split(' ').filter(Boolean).length
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  }, [news?.description])

  // Neighbours come from the same loaded page; related are the first four others
  const { newer, older, related } = useMemo(() => {
    const sorted = [...sectionNews].sort((a, b) => b.date.localeCompare(a.date))
    const index = sorted.findIndex((item) => item.slug === slug)
    return {
      newer: index > 0 ? sorted[index - 1] : null,
      older: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
      related: sorted.filter((item) => item.slug !== slug).slice(0, 4),
    }
  }, [sectionNews, slug])

  if (!slug) {
    return <div className="py-20 text-center text-ink-soft">Invalid URL</div>
  }
  if (isLoading) {
    return <Loader />
  }
  if (isError || !news) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt(t('newsDetail.copyPrompt', 'Скопируйте ссылку'), url)
    }
  }

  return (
    <div className="mb-20 mt-5">
      <article className="mx-auto max-w-[760px]">
        <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                {t('breadcrumbs.home', 'Главная')}
              </Link>
            </li>
            <ChevronRight size={14} aria-hidden className="text-ink-soft/60" />
            <li>
              <Link to="/news" className="transition-colors hover:text-primary">
                {t('breadcrumbs.news', 'Новости')}
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mt-6">
          {categories.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/news?cat=${cat.id}`}
                    className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {cat.title.trim()}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.2] tracking-tight text-ink text-balance md:text-[1.5rem]">
            {news.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
            {news.date && (
              <time className="inline-flex items-center gap-1.5 tabular-nums" dateTime={news.date}>
                <CalendarDays size={15} aria-hidden />
                {dayjs(news.date).format('DD.MM.YYYY')}
              </time>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} aria-hidden />
              {t('newsDetail.readingTime', {
                defaultValue: '{{count}} мин чтения',
                count: readingMinutes,
              })}
            </span>
          </div>
        </header>

        {news.banner && (
          <img
            src={news.banner}
            alt=""
            className="mt-6 aspect-[16/9] w-full rounded-2xl bg-mist object-cover"
          />
        )}

        <div
          className="prose-muit prose-wide mt-8 max-w-none text-[1.0625rem] leading-[1.7]"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        {gallery.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {t('newsDetail.gallery', 'Фотографии')}
            </h2>
            <Fancybox>
              <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-2">
                {gallery.map((item, index) => (
                  <li key={item.id ?? index}>
                    <a
                      href={item.image}
                      data-fancybox="news-gallery"
                      data-caption={item.title || ''}
                      className="group block aspect-[4/3] overflow-hidden rounded-xl bg-mist"
                    >
                      <img
                        src={item.image}
                        alt={item.title || ''}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Fancybox>
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <span className="text-sm font-semibold text-ink">
            {t('newsDetail.share', 'Поделиться')}
          </span>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(news.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={shareButton}
          >
            <img src="/social-icons/telegram.svg" alt="" className="h-5 w-5" />
            Telegram
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${news.title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={shareButton}
          >
            <img src="/social-icons/whatsapp.svg" alt="" className="h-5 w-5" />
            WhatsApp
          </a>
          <button type="button" onClick={copyLink} className={shareButton}>
            {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
            {copied
              ? t('newsDetail.copied', 'Ссылка скопирована')
              : t('newsDetail.copy', 'Скопировать ссылку')}
          </button>
        </div>

        {(newer || older) && (
          <nav
            aria-label={t('newsDetail.neighbours', 'Соседние новости')}
            className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-1"
          >
            {older ? (
              <Link
                to={`/news/${older.slug}`}
                className="group flex flex-col gap-1.5 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-primary/30"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                  <ArrowLeft size={13} aria-hidden />
                  {t('newsDetail.older', 'Предыдущая')}
                </span>
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-ink group-hover:text-primary">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                to={`/news/${newer.slug}`}
                className="group flex flex-col gap-1.5 rounded-2xl border border-line bg-white p-4 text-right transition-colors hover:border-primary/30 md:text-left"
              >
                <span className="inline-flex items-center justify-end gap-1.5 text-xs text-ink-soft md:justify-start">
                  {t('newsDetail.newer', 'Следующая')}
                  <ArrowRight size={13} aria-hidden />
                </span>
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-ink group-hover:text-primary">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t('newsDetail.related', 'Читайте также')}
            </h2>
            <Link
              to="/news"
              className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {t('news-page.allNews', 'Все новости')}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <ul className="grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
            {related.map((item) => (
              <li key={item.slug}>
                <NewsCard image={item.banner} title={item.title} description="" slug={item.slug} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
