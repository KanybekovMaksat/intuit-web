import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { HeroCarousel } from './heroCarousel/HeroCarousel'
import { Link } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { degreeQueries } from '~entities/degree'
import { Loader } from '~shared/ui/loader'

export const  HomeHero = () => {
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

  return (
    <section className=" r-sm:h-[360px]  rounded-md r-sm:mb-16 mb-20 relative overflow-hidden bg-[url('/bg2.png')] bg-cover bg-top ">
      <div className="relative py-5  r-md:py-6 px-4">
        <div className=" z-[100px] md:p-0">
          <div className="flex justify-between items-end md:flex-col mb-[30px]">
            <div className="mb-10 md:mb-0 r-md:mb-2 r-md:max-w-2xl max-w-4xl">
              <Typography
                variant="h1"
                className="mt-4 md:mb-4 md:text-2xl w-full md:w-full  text-white font-[900]   text-5xl"
              >
               IT EXPO 2025 - МУИТ
              </Typography>
              <p className="mb-20 md:mb-0 text-xl md:text-sm text-white mt-2 italic ">
                Образование, которое ведёт к реальной работе
              </p>
              <div className="flex flex-wrap max-w-[450px] gap-2 gap-y-4 md:hidden">

              </div>
            </div>
            <div className="w-[450px] md:w-full flex flex-col items-center">
              <img
                className="r-lg:hidden h-[350px] md:w-full md:h-auto object-cover md:my-5"
                src="/expo.png"
                alt="Hero"
              />
            </div>
            <div className="hidden mt-3 flex-wrap max-w-full gap-y-8 gap-1  md:flex">
              {facultyData?.data.map((item, index) => (
                <Link key={index} to={`/degree/${item.slug}/`}>
                  <span className=" text-[14px] px-2 hover:cursor-pointer  py-3 border border-white/50 bg-white rounded-full text-black font-bold">
                    {item.title}
                  </span>
                </Link>
              ))}
              <a href="">
                <span className=" text-[14px] px-2 hover:cursor-pointer  py-3 border border-blue text-white bg-blue rounded-full font-bold">
                  Помочь с выбором
                </span>
              </a>
            </div>
          </div>
          <div className="mt-[50px]">
            <HeroCarousel />
            {/* <FacultyCarousel /> */}
          </div>
        </div>
      </div>
    </section>
  )
}
