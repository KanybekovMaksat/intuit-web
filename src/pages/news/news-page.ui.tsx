import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { newsQueries } from '~entities/news'
import { NewsRecomendationList } from '~widgets/news-list'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FacultySchema } from '~entities/news/news.types'
import { t } from 'i18next'
import { Loader } from '~shared/ui/loader'

export const NewsPage = () => {
  const { slug } = useParams()
  if (!slug) {
    return <div> Invalid URL </div>
  }
  const {
    data: newsData,
    isLoading,
    isError,
    isSuccess,
  } = newsQueries.useGetNewsDetail(slug)

  console.log(newsData)

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('loading.error')}</div>
  }
  if (isSuccess) {
    return (
      <>
        <section className=" grid grid-cols-3 p-10 rounded-md my-10 md:grid-cols-1">
          <Box className="col-span-2 border-r-2 p-5 md:border-r-0 md:border-b-2">
            <img className="w-[100%]" src={newsData.data.banner} alt="" />
            <Typography
              variant="h4"
              className="md:text-[30px] md:text-center mt-10"
            >
              {newsData.data.title}
            </Typography>
            <Box className="mt-20">
              <div
                dangerouslySetInnerHTML={{ __html: newsData.data.description }}
              ></div>
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="w-full mt-10"
              >
                {newsData.data.images &&
                  newsData.data.images.map((item: FacultySchema) => {
                    return (
                      <SwiperSlide>
                        <img
                          className="w-full"
                          src={item.image}
                          alt={item.title}
                        />
                      </SwiperSlide>
                    )
                  })}
              </Swiper>
            </Box>
          </Box>

          <Box className="col-span-1 p-5">
            <Typography variant="h4">{t('news-page.otherNews')}</Typography>
            <NewsRecomendationList></NewsRecomendationList>
          </Box>
        </section>
      </>
    )
  }
}
