import { speakerQueries, SpeakerVideo } from '~entities/speaker'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import './index.css'
import { t } from 'i18next'
import { SectionHeader } from '~shared/ui/title'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'

interface SpeakerVideoListProps {
  facultyId?: number
}

export const SpeakerVideoList: React.FC<SpeakerVideoListProps> = ({
  facultyId,
}) => {
  const {
    data: filteredSpeakersData,
    isLoading: isFilteredLoading,
    isError: isFilteredError,
  } = speakerQueries.useGetSpeakers(facultyId)

  const {
    data: allSpeakersData,
    isLoading: isAllLoading,
    isError: isAllError,
  } = speakerQueries.useGetSpeakers()

  const isLoading = isFilteredLoading || isAllLoading
  const isError = isFilteredError && isAllError

  const filteredSpeakers = getApiList<any>(filteredSpeakersData?.data)
  const allSpeakers = getApiList<any>(allSpeakersData?.data)
  const speakersData =
    filteredSpeakers.length > 0 ? filteredSpeakers : allSpeakers

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>{t('loading.error')}</div>
  }

  if (!speakersData || speakersData.length === 0) {
    return <div>{t('loading.dataNotLoaded')}</div>
  }

  return (
    <>
      <div className="mt-14">
        <SectionHeader
          title={t('reviews.studentReviews')}
          action={
            <Link
              to="/reviews"
              className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {t('reviews.allReviews', 'Все отзывы')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          }
        />
      </div>

      <Swiper
        className="py-10 pointer"
        slidesPerView={5}
        scrollbar={{}}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        modules={[Scrollbar]}
        spaceBetween={30} // Увеличиваем расстояние между элементами
      >
        {speakersData.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <SpeakerVideo {...item}></SpeakerVideo>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
