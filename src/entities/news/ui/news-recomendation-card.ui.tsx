import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

interface NewsRecomendationCardProps {
  title: string
  date: string
  slug: string
}

/** Compact row for the "other news" rail: date and headline, whole row is the link. */
export const NewsRecomendationCard = ({ title, date, slug }: NewsRecomendationCardProps) => {
  return (
    <Link
      to={`/news/${slug}`}
      className="group block rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_14px_30px_-20px_rgba(42,33,114,0.4)]"
    >
      <time className="text-xs font-medium tabular-nums text-ink-soft">
        {dayjs(date).format('DD.MM.YYYY')}
      </time>
      <h3 className="mt-1.5 line-clamp-3 text-[15px] font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-primary">
        {title}
      </h3>
    </Link>
  )
}
