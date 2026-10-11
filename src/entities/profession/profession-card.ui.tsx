import { Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const capitalizeFirstLetter = (text: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
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
}: ProfessionCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Card
      onClick={() => navigate(`/specialization/${url}`)}
      className="group flex h-full min-h-[240px] w-full cursor-pointer flex-col justify-between bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.28)]"
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist">
              <img src={icon} alt="" className="h-6 w-6" />
            </span>
          )}
          <div className="min-w-0 text-left">
            <div className="truncate text-xs font-semibold text-green-dark">{degree}</div>
            <div className="truncate text-sm text-ink-soft">
              {capitalizeFirstLetter(faculties)}
            </div>
          </div>
        </div>

        <Typography
          variant="h6"
          className="text-left text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-primary">
        {t('homepage.buttons.viewButton')}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
          <ArrowRight size={16} />
        </span>
      </div>
    </Card>
  )
}
