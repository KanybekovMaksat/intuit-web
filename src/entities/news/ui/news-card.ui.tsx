import React from 'react'
import { Link } from 'react-router-dom'

interface NewsCardProps {
  image: string
  title: string
  description: string
  slug: string
}

export const NewsCard: React.FC<NewsCardProps> = ({ image, title, slug }) => {
  return (
    <Link
      to={`/news/${slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.25)]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-mist">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-3 text-base font-semibold leading-snug tracking-tight text-ink">
          {title}
        </h3>
      </div>
    </Link>
  )
}
