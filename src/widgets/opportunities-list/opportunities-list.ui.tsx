import { Card, Typography } from '@mui/material'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
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

const OpportunityCard = ({ item }: { item: OpportunityItem }) => {
  const { t } = useTranslation()

  return (
    <Card
      className="rounded-2xl w-full h-full min-h-[260px] p-6 sm:p-5 pb-6 bg-[#F9FAFB] border border-[#2A2172]/10 shadow-sm hover:shadow-md hover:border-[#00956F]/40 transition-all duration-300 flex flex-col justify-start text-left"
      sx={{
        backgroundColor: '#F9FAFB',
        borderRadius: '16px',
        border: '1px solid rgba(42, 33, 114, 0.1)',
        boxShadow: '0 2px 12px rgba(42, 33, 114, 0.05)',
        textAlign: 'left',
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        className="text-[#2A2172] font-bold text-lg sm:text-[16px] leading-snug text-left"
        sx={{
          fontWeight: 700,
          color: '#2A2172',
          textAlign: 'left',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {t(item.titleKey)}
      </Typography>

      <ul className="mt-4 flex flex-col gap-3 flex-1 text-left list-none p-0 m-0">
        {item.bullets.map((bulletKey) => (
          <li
            key={bulletKey}
            className="flex items-start gap-2.5 text-left text-sm sm:text-[13px] leading-relaxed text-[#2A2172]/85 font-normal"
          >
            <BoltRoundedIcon
              className="flex-shrink-0 mt-0.5 text-[#00956F]"
              fontSize="small"
              sx={{ color: '#00956F', fontSize: '18px' }}
            />
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
        {opportunities.map((item) => (
          <div key={item.id} className="h-full">
            <OpportunityCard item={item} />
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
              <OpportunityCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
