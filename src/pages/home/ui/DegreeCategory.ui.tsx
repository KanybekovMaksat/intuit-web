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
import { SectionHeader } from '~shared/ui/title'
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

  const renderCard = (degree: DegreeSchema) => {
    const banner = degree.banner
      ? degree.banner.startsWith('http')
        ? degree.banner
        : API_URL + degree.banner
      : ''

    return (
      <Card
        onClick={() => navigate(`/degree/${degree.slug}`)}
        className="group relative flex h-full min-h-[236px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-0 bg-primary text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(42,33,114,0.55)]"
      >
        {banner && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${banner})` }}
          />
        )}
        <div
          className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(0,149,111,0.7) 0%, rgba(0,149,111,0) 70%)',
          }}
        />

        <CardContent className="relative z-10 flex h-full flex-col justify-between gap-8 p-6 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            {getIconById(degree.id)}
          </div>

          <div>
            <Typography
              variant="h4"
              className="text-left font-semibold leading-tight"
              sx={{
                fontSize: '1.75rem',
                letterSpacing: '-0.015em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {degree.title}
            </Typography>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/12 px-3 py-1.5 text-[13px] font-medium text-white">
                  <span className="font-semibold tabular-nums">{degree.facultyCount || 0}</span>{' '}
                  {t('homepage.degrees.collegesCount')}
                </span>
                <span className="rounded-full bg-white/12 px-3 py-1.5 text-[13px] font-medium text-white">
                  <span className="font-semibold tabular-nums">{degree.programCount}</span>{' '}
                  {t('homepage.degrees.programCount')}
                </span>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Never leave an orphaned row: 6 items fit 3 columns, 4 or 8 fit 4
  const desktopCols = degrees.length % 4 === 0 || degrees.length % 3 !== 0 ? 'grid-cols-4' : 'grid-cols-3'

  return (
    <section className="py-12 sm:py-8">
      <div className="w-full">
        <SectionHeader title={t('homepage.degrees.degreeCategory')} />

        {/* Desktop: every level visible at once */}
        <div className={`grid ${desktopCols} gap-6 xll:grid-cols-2 lg:hidden`}>
          {degrees.map((degree: DegreeSchema) => (
            <div key={degree.id}>{renderCard(degree)}</div>
          ))}
        </div>

        {/* Tablet and mobile: swipeable row */}
        <div className="hidden lg:block">
          <Swiper
            className="degree-swiper-themed px-1 pb-12"
            modules={[Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.15, spaceBetween: 12 },
              640: { slidesPerView: 2.1, spaceBetween: 16 },
            }}
          >
            {degrees.map((degree: DegreeSchema) => (
              <SwiperSlide key={degree.id} className="!h-auto !bg-transparent">
                {renderCard(degree)}
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
