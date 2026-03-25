import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material'
import { Link } from 'react-router-dom'

interface NewsCardProps {
  image: string
  title: string
  description: string
  slug: string
}

export const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  description,
  slug,
}) => {
  // const truncatedDescription =
  //   description.length > 120 ? description.slice(0, 120) + '...' : description;

  const truncatedTitle = title.length > 65 ? title.slice(0, 65) + '...' : title

  return (
    <Link to={`/news/${slug}`}>
     <div className="border border-[gray]/30 max-w-sm h-[300px] min-h-[350px] flex flex-col justify-between shadow-none rounded-sm  overflow-hidden">
        <div className="flex flex-col h-full">
          <img
            src={image}
            alt={title}
            className="h-60 w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-4">
            <h3 className="text-base text-left font-bold line-clamp-2">
              {truncatedTitle}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
