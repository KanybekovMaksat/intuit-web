import { Card, CardContent, Typography } from '@mui/material'
import { degreeQueries } from '~entities/degree'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  ArrowRight,
  Book,
  Briefcase,
  Code,
  Globe,
  GraduationCap,
  University,
} from 'lucide-react'
import { Title } from '~shared/ui/title'
import { Loader } from '~shared/ui/loader'
import { DegreeSchema } from '~entities/degree/degree.types'
import { API_URL } from '~shared/lib/api/apiClient'
import { getApiList } from '~shared/lib/api/getApiList'

export const DegreeCategory = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: degreeData, isLoading, isError } = degreeQueries.useGetDegrees()
  const degrees = getApiList<DegreeSchema>(degreeData?.data).sort(
    (a, b) => a.id - b.id
  )

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return (
      <div className="text-center py-20">
        <Typography variant="h5" className="text-primary">{t('homepage.loading.error')}</Typography>
      </div>
    )
  }

  const getIconById = (id: number) => {
    const iconProps = { size: 26, strokeWidth: 1.7, className: "text-green" }
    const icons = [
      <Code {...iconProps} />,
      <Briefcase {...iconProps} />,
      <Book {...iconProps} />,
      <Globe {...iconProps} />,
      <GraduationCap {...iconProps} />,
      <University {...iconProps} />,
    ]
    return icons[id % icons.length]
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-primary/10 pb-6 md:flex-col md:items-start">
          <div>
            <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-green">
              <span className="h-px w-8 bg-green" />
              {t('homepage.degrees.programs')}
            </div>
            <Title className="!m-0 !text-left !text-4xl !font-semibold !leading-tight !text-primary md:!text-3xl">
              {t('homepage.degrees.degreeCategory')}
            </Title>
          </div>
        </div>
        
        <div className="relative">
          <Swiper
            className="degree-swiper-themed px-1 pb-14"
            modules={[Pagination]}
            slidesPerView={4}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {degrees.map((degree: DegreeSchema) => (
                <SwiperSlide key={degree.id} className="!h-auto">
                  <Card
                    onClick={() => navigate(`/degree/${degree.slug}`)}
                    className="group relative flex h-[360px] cursor-pointer flex-col overflow-hidden rounded-lg border border-primary/10 bg-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_20px_50px_rgba(42,33,114,0.14)]"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-45 transition-transform duration-700 group-hover:scale-105"
                      style={{ 
                        backgroundImage: degree.banner ? `url(${degree.banner.startsWith('http') ? degree.banner : API_URL + degree.banner})` : 'none',
                        backgroundColor: '#2A2172'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/86 to-primary" />
                    
                    <CardContent className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                      <div>
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur">
                          {getIconById(degree.id)}
                        </div>
                        <Typography
                          variant="h4"
                          className="text-left font-semibold leading-tight"
                          sx={{ 
                            fontSize: '1.75rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {degree.title}
                        </Typography>
                        <div className="mt-4 h-[2px] w-10 bg-green transition-all duration-300 group-hover:w-16" />
                      </div>

                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col">
                            <span className="mb-1 text-[10px] uppercase tracking-[0.14em] text-white/55">
                              {t('homepage.degrees.collegesCount')}
                            </span>
                            <span className="text-2xl font-semibold">
                              {degree.facultyCount || 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="mb-1 text-[10px] uppercase tracking-[0.14em] text-white/55">
                              {t('homepage.degrees.programCount')}
                            </span>
                            <span className="text-2xl font-semibold">
                              {degree.programCount}
                            </span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-green">
                          {t('homepage.buttons.viewButton')}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      
      <style>{`
        .degree-swiper-themed .swiper-pagination-bullet {
          background: #2A2172 !important;
          opacity: 0.2;
          width: 8px;
          height: 8px;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .degree-swiper-themed .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2A2172 !important;
          width: 24px;
        }
      `}</style>
    </section>
  )
}
