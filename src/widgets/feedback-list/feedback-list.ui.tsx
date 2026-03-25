import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'
import {
  FeedbackCard,
  feedbackQueries,
  feedbackTypes,
} from '~entities/feedback'
import { t } from 'i18next'
import { Loader } from '~shared/ui/loader'

export const FeedbackList = () => {
  const {
    data: feedbackData,
    isLoading,
    isSuccess,
    isError,
  } = feedbackQueries.useGetFeedbacks()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('loading.error')}</div>
  }
  if (isSuccess) {
    return (
      <>
        <Swiper
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper cursor-grabbing select-none	"
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {feedbackData?.data.map((feedback: feedbackTypes.Feedback) => {
            return (
              <SwiperSlide key={feedback.id}>
                <FeedbackCard {...feedback} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </>
    )
  }
}
