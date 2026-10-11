import { NewsCard, newsQueries } from '~entities/news'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { Title } from '~shared/ui/title'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'

interface NewsListProps {
  id?: string | null
  category?: number | null
  title?: string | null
}

export const NewsList = ({ id = null, category = null, title = null }: NewsListProps) => {
  const { data, isError, isLoading, isSuccess } = id
    ? newsQueries.useGetNewsInstitutes(id as any, null)
    : category
    ? newsQueries.useGetNewsInstitutes(null, category as any)
    : newsQueries.useGetNews()
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  if (isLoading) return <Loader />
  if (isError) return <div>Ошибка при загрузке новостей</div>
  if (!data?.data) return <div>Нет данных</div>

  const news = getApiList<any>(data.data)

  if (isSuccess && news.length > 0) {
    const arrowClass =
      'flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-primary'

    return (
      <section className="mt-14 sm:mt-10">
        <div className="mb-8 flex items-end justify-between gap-4 md:flex-col md:items-start">
          <Title className="!my-0">{title || t('news-page.news')}</Title>
          <div className="flex items-center gap-2">
            <Link
              to="/news"
              className="mr-2 inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {t('news-page.allNews', 'Все новости')}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <button
              type="button"
              aria-label="Назад"
              disabled={atStart}
              onClick={() => swiper?.slidePrev()}
              className={arrowClass}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Вперёд"
              disabled={atEnd}
              onClick={() => swiper?.slideNext()}
              className={arrowClass}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(instance) => {
            setSwiper(instance)
            setAtStart(instance.isBeginning)
            setAtEnd(instance.isEnd)
          }}
          onSlideChange={(instance) => {
            setAtStart(instance.isBeginning)
            setAtEnd(instance.isEnd)
          }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.8, spaceBetween: 16 },
            768: { slidesPerView: 2.6, spaceBetween: 20 },
            1024: { slidesPerView: 3.4, spaceBetween: 20 },
            1440: { slidesPerView: 4.2, spaceBetween: 20 },
          }}
          className="!pb-2"
        >
          {news.map((item) => (
            <SwiperSlide key={item.slug} className="!h-auto !items-stretch !bg-transparent">
              <NewsCard
                image={item.banner}
                title={item.title}
                description={item.description}
                slug={item.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  }

  return null
}
