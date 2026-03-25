import { useTranslation } from 'react-i18next'
import { articleQueries } from '~entities/makalabox/degree'
import { ArticleCard } from '~entities/makalabox/degree/ui/ArticleCard'
import { Title } from '~shared/ui/title'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export const ArticleList = () => {
  const { t } = useTranslation()
  const { data: articles, isSuccess } = articleQueries.useGetArticles()
  const latestArticles = articles?.data.results.slice(0, 4)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 1024)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <div>
      <Title>{t('homepage.universityBlogArticles')}</Title>
      {isSuccess && latestArticles && (
        <>
          {isMobile ? (
            <Swiper
              className="py-10 px-1 diplom-list"
              modules={[Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1.8,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 20,
                },
              }}
            >
              {latestArticles.map((article) => (
                <SwiperSlide key={article.id}>
                  <ArticleCard article={article} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-between gap-5">
              {latestArticles.map((article) => (
                <ArticleCard article={article} key={article.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
