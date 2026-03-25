import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

type FacultyPageType = {
  subtitle: string
  title: string
  banner: string
  programCount: number
  icon: string
}

export const InstituteBanner: React.FC<FacultyPageType> = ({
  subtitle,
  title,
  banner,
  programCount,
  icon,
}) => {
  return (
    <div
      className="bg-[#f5f5f5] p-7 rounded-2xl flex md:flex-col bg-no-repeat  bg-cover bg-center text-white"
      style={{ backgroundImage: `url(/bg2.png)` }}
    >
      <div className="flex relative justify-between w-full md:flex-col-reverse">
        <div className="flex flex-col justify-between min-h-[300px] z-10">
          <div>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="text-white font-semibold"
            >
              <Link color="inherit" to="/">
                Главная
              </Link>
              <Link to="/institutes/">Институты</Link>
              <Typography className="capitalize text-white font-semibold">
                {subtitle}
              </Typography>
            </Breadcrumbs>
            <Typography
              variant="h1"
              component="h1"
              className="text-[2rem] max-w-[800px] font-semibold  mt-7 lg:text-[40px] md:!text-[25px] md:text-center"
            >
              {title}
            </Typography>
            <img
              src={banner}
              alt=""
              className="max-h-[300px] hidden md:block md:m-auto"
            />
          </div>
          <div className="self-start  text-white py-3 font-bold px-4 rounded-lg flex gap-2 bg-blue/90 backdrop-blur-sm md:self-center">
            {programCount} Специализации{' '}
            <img src={icon} alt="" className="filter invert md:hidden" />
          </div>
        </div>
        <img src={banner} alt="" className="max-h-[300px] md:hidden" />
      </div>
    </div>
  )
}
