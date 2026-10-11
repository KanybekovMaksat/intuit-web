import { ArrowUpRight } from 'lucide-react'
import { articleTypes } from '..'

type ArticleCardProps = { article: articleTypes.Article }

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text

  return (
    <a
      href={`https://makalabox.com/article/${article.id}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.25)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-mist">
        <img
          src={article.photo}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
          {truncateText(article.title, 60)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {truncateText(article.subtitle, 90)}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
          Читать дальше
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  )
}
