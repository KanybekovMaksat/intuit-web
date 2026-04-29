import { Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Book,
  GraduationCap,
  Laptop,
  Microscope,
  PenTool,
  Scale,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const capitalizeFirstLetter = (text: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const getBackgroundIcon = (title: string) => {
  const props = {
    size: 160,
    className:
      'absolute -bottom-8 -right-8 text-white/[0.05] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6',
  }
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes('программист') || lowerTitle.includes('ит')) {
    return <Laptop {...props} />
  }
  if (lowerTitle.includes('менеджмент') || lowerTitle.includes('экономика')) {
    return <Book {...props} />
  }
  if (lowerTitle.includes('инженер')) return <PenTool {...props} />
  if (lowerTitle.includes('юрист') || lowerTitle.includes('право')) {
    return <Scale {...props} />
  }
  if (lowerTitle.includes('врач') || lowerTitle.includes('медицина')) {
    return <Microscope {...props} />
  }

  return <GraduationCap {...props} />
}

interface ProfessionCardProps {
  degree: string
  faculties: string
  title: string
  url: string
  icon?: string
  index: number
}

export const ProfessionCard = ({
  degree,
  faculties,
  title,
  url,
  icon,
  index,
}: ProfessionCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const displayIndex = (index + 1).toString().padStart(2, '0')

  return (
    <Card
      onClick={() => navigate(`/specialization/${url}`)}
      className="group relative flex h-full min-h-[300px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-primary/10 bg-primary p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_20px_50px_rgba(42,33,114,0.16)]"
    >
      {getBackgroundIcon(title)}

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0 text-left">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {degree}
            </div>
            <div className="truncate text-sm font-medium text-white/75">
              {capitalizeFirstLetter(faculties)}
            </div>
          </div>
          <span className="rounded-lg border border-white/15 px-2.5 py-1 text-xs font-semibold text-white/45">
            {displayIndex}
          </span>
        </div>

        <Typography
          variant="h6"
          className="text-left text-xl font-semibold leading-tight text-white"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <div className="mt-5 h-[2px] w-10 bg-green transition-all duration-300 group-hover:w-16" />
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        {icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green transition-all duration-300 group-hover:bg-white">
            <img
              src={icon}
              alt=""
              className="h-6 w-6 invert transition-all group-hover:invert-0"
            />
          </div>
        ) : (
          <div className="h-3 w-3 rounded-full bg-green shadow-lg shadow-green/20 transition-transform duration-300 group-hover:scale-125" />
        )}

        <div className="flex items-center gap-2 text-sm font-semibold text-white/65 transition-all group-hover:text-white">
          {t('homepage.buttons.viewButton')}
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-all group-hover:border-green group-hover:bg-green">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Card>
  )
}
