import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Marquee from 'react-fast-marquee'
import { Link } from 'react-router-dom'
import { eventQueries } from '~entities/events'
import { Loader } from '~shared/ui/loader'

export const HeroCarousel: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // 🟢 Перемещено выше

  const { data: eventsData, isLoading, isError } = eventQueries.useGetEvents()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>Ошибка</div>
  }

  return (
    <div className="w-full overflow-hidden">
      <Marquee direction="left" speed={100} className=" overflow-x-none">
        <div className="flex items-center r-sm:gap-3 r-sm:ml-3 gap-4 ml-4">
          {eventsData.data.map((carusel, i) => (
            <div key={i}>
              {!isMobile ? (
                <div className="flex items-center justify-between backdrop-blur-xl bg-white/30 p-2 rounded-lg w-[400px] h-[100px] text-white">
                  <div className="flex flex-col gap-5 items-start">
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '220px',
                      }}
                      variant="h3"
                      className="mb-2 text-[14px] font-normal"
                    >
                      {carusel.title}
                    </Typography>
                    <Link
                      to={`/news/event/${carusel.slug}`}
                      className="bg-blue inline-flex items-center text-white text-sm px-3 py-1 rounded transition"
                    >
                      Перейти
                    </Link>
                  </div>
                  <img
                    src={carusel.banner}
                    alt="photo"
                    className="rounded-lg w-36 h-[82px] bg-black object-cover"
                  />
                </div>
              ) : (
                <div className="flex gap-4">
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '220px',
                    }}
                    variant="h3"
                    className="mb-2 r-sm:text-base backdrop-blur-xl bg-white/30 px-2 py-1 rounded-md text-white text-lg font-normal"
                  >
                    {carusel.title}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}
