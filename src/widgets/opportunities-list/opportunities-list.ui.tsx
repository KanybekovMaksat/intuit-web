import { Card, Typography } from '@mui/material'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Title } from '~shared/ui/title'

interface OpportunityItem {
  id: string
  titleKey: string
  bullets: string[]
}

const opportunities: OpportunityItem[] = [
  {
    id: 'materials',
    titleKey: 'homepage.opportunities.materials.title',
    bullets: [
      'homepage.opportunities.materials.moodle',
      'homepage.opportunities.materials.review',
      'homepage.opportunities.materials.keepUp',
    ],
  },
  {
    id: 'transfer',
    titleKey: 'homepage.opportunities.transfer.title',
    bullets: [
      'homepage.opportunities.transfer.contact',
      'homepage.opportunities.transfer.documents',
      'homepage.opportunities.transfer.assistance',
    ],
  },
  {
    id: 'payment',
    titleKey: 'homepage.opportunities.payment.title',
    bullets: [
      'homepage.opportunities.payment.onlineCheck',
      'homepage.opportunities.payment.mobileApps',
      'homepage.opportunities.payment.monthly',
    ],
  },
  {
    id: 'career',
    titleKey: 'homepage.opportunities.career.title',
    bullets: [
      'homepage.opportunities.career.resumeHelp',
      'homepage.opportunities.career.interviewPrep',
      'homepage.opportunities.career.referenceLetter',
    ],
  },
]

const OpportunityCard = ({ item, featured = false }: { item: OpportunityItem; featured?: boolean }) => {
  const { t } = useTranslation()

  return (
    <Card
      className="flex h-full min-h-[260px] w-full flex-col justify-start p-7 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-5"
      sx={{
        backgroundColor: featured ? '#2A2172' : '#FFFFFF',
        borderRadius: '16px',
        border: featured ? '1px solid #2A2172' : '1px solid #E1E3EE',
        boxShadow: 'none',
        textAlign: 'left',
        '&:hover': { borderColor: 'rgba(42, 33, 114, 0.35)' },
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        className="text-lg font-semibold leading-snug tracking-tight text-left sm:text-[16px]"
        sx={{
          fontWeight: 600,
          color: featured ? '#FFFFFF' : '#14123A',
          textAlign: 'left',
        }}
      >
        {t(item.titleKey)}
      </Typography>

      <ul className="mt-4 flex flex-col gap-3 flex-1 text-left list-none p-0 m-0">
        {item.bullets.map((bulletKey) => (
          <li
            key={bulletKey}
            className={`flex items-start gap-2.5 text-left text-sm leading-relaxed font-normal ${featured ? 'text-white/85' : 'text-ink-soft'}`}
          >
            <Check size={18} strokeWidth={2.2} className={`mt-0.5 shrink-0 ${featured ? 'text-white' : 'text-green'}`} aria-hidden />
            <span className="flex-1 text-left leading-snug">{t(bulletKey)}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export const OpportunitiesList = () => {
  const { t } = useTranslation()

  return (
    <div className="my-12 sm:my-6">
      <Title>{t('homepage.opportunities.title')}</Title>

      {/* Desktop grid (>= 1024px) */}
      <div className="grid grid-cols-4 gap-5 mt-6 xll:grid-cols-2 lg:hidden items-stretch">
        {opportunities.map((item, i) => (
          <div key={item.id} className="h-full">
            <OpportunityCard item={item} featured={i === 0} />
          </div>
        ))}
      </div>

      {/* Mobile & Tablet Carousel (< 1024px) */}
      <div className="hidden lg:block mt-6">
        <Swiper
          className="pb-12 pt-2 px-1 diplom-list"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
          }}
        >
          {opportunities.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto !flex items-stretch">
              <OpportunityCard item={item} featured={item.id === 'materials'} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
