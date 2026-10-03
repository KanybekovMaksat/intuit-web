import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { degreeQueries } from '~entities/degree'
import { Loader } from '~shared/ui/loader'
import { FacultyCarousel } from './heroCarousel/FacultyCarousel'
import { DegreeSchema } from '~entities/degree/degree.types'
import { getApiList } from '~shared/lib/api/getApiList'

export const HomeHero = () => {
  const { t } = useTranslation()
  const {
    data: facultyData,
    isLoading,
    isError,
  } = degreeQueries.useGetDegrees()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('loading.error')}</div>
  }

  const facultyItems = getApiList<DegreeSchema>(facultyData?.data).map((item, index) => (
    <Link key={index} to={`/degree/${item.slug}/`} className="inline-flex">
      <span className="inline-flex items-center justify-center text-[13px] sm:text-xs px-3.5 sm:px-3 py-1.5 border border-white/50 bg-white rounded-full text-black font-semibold hover:bg-white/90 hover:scale-105 transition-all shadow-sm">
        {item.title}
      </span>
    </Link>
  ))

  return (
    <section className="rounded-md mb-20 relative overflow-hidden bg-[url('/bg2.png')] bg-cover bg-top">
      <div className="relative py-5 px-4 sm:px-3">
        <div className="z-[100px] md:p-0">
          <div className="flex justify-between items-end md:flex-col mb-[30px]">
            <div className="mb-10 md:mb-0 max-w-4xl">
              <Typography
                variant="h1"
                className="mt-4 md:mb-3 text-5xl md:text-2xl sm:text-[22px] sm:leading-snug w-full text-white font-[900]"
              >
                {t('homepage.hero.title', 'Выбирай не просто специальность — выбирай будущее с МУИТ')}
              </Typography>
              <p className="mb-20 md:mb-0 text-xl md:text-sm sm:text-xs text-white mt-2 italic">
                {t('homepage.hero.subtitle', 'Образование, которое ведёт к реальной работе')}
              </p>
              
              {/* Desktop & Mobile Faculty list */}
              <div className="flex flex-wrap max-w-[450px] md:max-w-full gap-2 gap-y-2.5 mt-8 md:mt-4 items-center">
                {facultyItems}
                <a
                  href="#enroll-form"
                  className="inline-flex"
                  onClick={(e) => {
                    const el = document.getElementById('enroll-form')
                    if (el) {
                      e.preventDefault()
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center justify-center text-[13px] sm:text-xs px-4 py-1.5 bg-[#00956F] border border-[#00956F] hover:bg-[#007f5e] rounded-full text-white font-bold transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    {t('homepage.hero.helpButton', 'Помочь с выбором')}
                  </button>
                </a>
              </div>
            </div>

            <div className="w-[450px] md:w-full flex flex-col items-center">
              <img
                className="r-lg:hidden h-[350px] md:w-full md:h-auto object-cover md:my-5"
                src="/imagee.png"
                alt="Hero"
              />
            </div>
          </div>
          <div className="mt-[50px]">
            <FacultyCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
