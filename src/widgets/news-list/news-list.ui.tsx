import { NewsCard, newsQueries } from '~entities/news'
import { Pagination } from '@mui/material'
import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { t } from 'i18next'
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
  const [currentPage, setCurrentPage] = useState(1)
  const swiperRef = useRef(null)

  if (isLoading) return <Loader />
  if (isError) return <div>Ошибка при загрузке новостей</div>
  if (!data?.data) return <div>Нет данных</div>

  const news = getApiList<any>(data.data)
  const totalPages = Math.ceil(news.length)

  if (isSuccess && news.length > 0) {
    return (
      <div>
        <Title>{title || t('news-page.news')}</Title>
        <Swiper
          className="my-10"
          modules={[Navigation, SwiperPagination]}
          spaceBetween={20}
          slidesPerView={2.5}
          onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3.5,
            },
          }}
        >
          {news.map((item) => (
            <SwiperSlide key={item.slug}>
              <NewsCard
                image={item.banner}
                title={item.title}
                description={item.description}
                slug={item.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => {
              setCurrentPage(page)
              swiperRef.current?.slideTo(page - 1)
            }}
            className="rounded-lg shadow-md p-2"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                color: 'white',
                backgroundColor: '#00956F',
              },
            }}
          />
        </div>
      </div>
    )
  }
}
