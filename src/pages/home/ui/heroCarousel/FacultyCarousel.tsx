import { Typography, useTheme } from '@mui/material'
import { ArrowUpRight } from 'lucide-react'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { facultyQueries } from '~entities/faculties'
import { FacultySchema } from '~entities/faculties/faculty.types'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'

export const FacultyCarousel: React.FC = () => {
  useTheme() // Keep it if intended for future use, otherwise remove. But it was not used.
  const { t } = useTranslation()

  const {
    data: eventsData,
    isLoading,
    isError,
  } = facultyQueries.useGetFaculties()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('homepage.loading.error')}</div>
  }

  const faculties = getApiList<FacultySchema>(eventsData?.data)

  return (
    <div className="w-full overflow-hidden">
      <Marquee direction="left" speed={100} className="overflow-x-none">
        <div className="flex items-center r-sm:gap-3 r-sm:ml-3 gap-4 ml-4">
          {faculties.map((carusel, i) => (
            <Link
              key={i}
              to={`/institutes/${carusel.slug}`}
              className="no-underline"
            >
              <div className="group flex items-center justify-between backdrop-blur-xl bg-white/30 p-3 rounded-lg w-full text-white hover:bg-white/90 hover:text-black transition">
                <div className="flex flex-col items-start">
                  <Typography
                    variant="h3"
                    className="text-[14px] font-normal gap-1 flex items-center"
                  >
                    {carusel.subtitle}
                    <ArrowUpRight
                      size={18}
                      className="ml-1 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Marquee>
    </div>
  )
}
