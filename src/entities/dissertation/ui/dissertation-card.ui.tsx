import { Card, Typography } from '@mui/material'
import { ArrowRight, CalendarClock, MessageCircleQuestion } from 'lucide-react'
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
  const deadline =
    status === 'upcoming'
      ? `Обсуждение с ${formatDate(dissertation.discussionStartAt)}`
      : `Обсуждение до ${formatDate(dissertation.discussionEndAt)}`

  return (
    <Card className="group flex h-full flex-col rounded-lg border border-primary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_20px_50px_rgba(42,33,114,0.12)] sm:p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${discussionStatusClass[status]}`}
        >
          {discussionStatusLabel[status]}
        </span>
        {Boolean(unansweredCount) && (
          <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            Без ответа: {unansweredCount}
          </span>
        )}
      </div>

      <div className="mb-2 text-sm font-semibold text-green">
        {dissertation.doctoralStudentName}
      </div>
      <Typography
        variant="h6"
        className="text-left text-lg font-semibold leading-snug text-primary"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {dissertation.title}
      </Typography>
      <div className="mt-3 text-sm text-primary/60">{dissertation.specialty}</div>
      <p
        className="mt-3 text-sm leading-relaxed text-black/70"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {dissertation.abstract}
      </p>
      <div className="mt-2 text-xs text-black/50">
        Научный руководитель: {dissertation.supervisor}
      </div>

      <div className="mt-auto pt-5">
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-primary/10 pt-4 text-sm text-primary/70">
          <span className="flex items-center gap-1.5">
            <CalendarClock size={16} /> {deadline}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircleQuestion size={16} /> {questionsLabel(dissertation.questionsCount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-black/40">
            Опубликовано {formatDate(dissertation.publishedAt)}
          </span>
          <Link
            to={pathKeys.phd.dissertation(dissertation.id)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green"
          >
            Открыть <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  )
}
