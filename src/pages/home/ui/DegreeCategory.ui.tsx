import { Button, Card, CardContent, Typography } from '@mui/material'
import { degreeQueries } from '~entities/degree'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  Book,
  Briefcase,
  Code,
  ExternalLink,
  Globe,
  GraduationCap,
  University,
} from 'lucide-react'
import { Title } from '~shared/ui/title'
import { Loader } from '~shared/ui/loader'

export const DegreeCategory = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: degreeData, isLoading, isError } = degreeQueries.useGetDegrees()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <h1>{t('homepage.loading.error')}</h1>
  }

  const getIconById = (id: number) => {
    const icons = [
      <Code className="text-white" />,
      <Briefcase className="text-white" />,
      <Book className="text-white" />,
      <Globe className="text-white" />,
      <GraduationCap className="text-white" />,
      <University className="text-white" />,
    ]
    return icons[id % icons.length]
  }

  return (
    <div>
      <Title
      // className="text-[2.5rem] font-semibold text-[#333] lg:text-[40px] md:!text-[30px]"
      >
        {t('homepage.degrees.degreeCategory')}
      </Title>
      <div className="relative">
        <Swiper
          className="py-10 px-1 degree-list text-left"
          modules={[Pagination]}
          slidesPerView={4}
          pagination={{ clickable: true }}
          breakpoints={{
            360: { slidesPerView: 1, centeredSlides: true, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 3.5, spaceBetween: 5 },
          }}
        >
          {degreeData?.data
            .sort((a, b) => a.id - b.id)
            .map((degree) => (
              <SwiperSlide key={degree.id}>
                <Card
                  onClick={() => navigate(`degree/${degree.slug}`)}
                  className={`relative overflow-hidden max-w-[350px] text-left p-4 border-2  bg-green text-white transition 
                  duration-200 rounded-md hover:cursor-pointer shadow-none bg-cover bg-center md:max-w-full flex flex-col justify-between`}
                >
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <Typography
                      variant="h6"
                      className="font-bold text-lg flex items-center gap-1 "
                    >
                      {degree.title}
                      {getIconById(degree.id)}
                    </Typography>
                    <CardContent className="p-0 pt-5 flex items-end justify-between font-medium">
                      <div>
                        <Typography
                          variant="subtitle1"
                          className="leading-[20px] text-[16px] font-medium"
                        >
                          {degree.facultyCount}
                          {' ' + t('homepage.degrees.collegesCount')}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className="leading-[20px] text-[16px] font-medium"
                        >
                          {degree.programCount}
                          {' ' + t('homepage.degrees.programCount')}
                        </Typography>
                      </div>
                      <div>
                        <Button className="bg-blue/60 text-white/90 font-semibold text-xs flex items-center gap-1">
                          <p>Узнать больше</p>
                          <p>
                            <ExternalLink size={18} />
                          </p>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}
