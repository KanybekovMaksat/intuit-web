import { Card, Typography } from '@mui/material'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import {
  discussionStatusClass,
  discussionStatusLabel,
  formatDate,
  questionsLabel,
} from '../dissertation.lib'
import { Dissertation } from '../dissertation.types'

type DissertationCardProps = {
  dissertation: Dissertation
  unansweredCount?: number
}

export const DissertationCard = ({ dissertation, unansweredCount }: DissertationCardProps) => {
  const status = dissertation.discussionStatus

  return (
    <Card className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(42,33,114,0.35)] sm:p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${discussionStatusClass[status]}`}
        >
          {discussionStatusLabel[status]}
        </span>
        {Boolean(unansweredCount) && (
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            Без ответа: {unansweredCount}
          </span>
        )}
      </div>

      <div className="mb-2 text-sm font-semibold text-green-dark">
        {dissertation.doctoralStudentName}
      </div>
      <Typography
        variant="h6"
        className="text-left text-lg font-semibold leading-snug text-ink"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {dissertation.title}
      </Typography>
      <div className="mt-3 text-sm text-ink-soft">{dissertation.specialty}</div>
      <div className="mt-2 text-xs text-ink-soft">
        Научный руководитель: {dissertation.supervisor}
      </div>

      <div className="mt-auto pt-5">
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <MessageCircleQuestion size={16} /> {questionsLabel(dissertation.questionsCount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-ink-soft">
            Опубликовано {formatDate(dissertation.publishedAt)}
          </span>
          <Link
            to={pathKeys.phd.dissertation(dissertation.id)}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-dark"
          >
            Открыть <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  )
}
