import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'
import { eventTypes } from '..'
import { Link } from 'react-router-dom'

export const EventCard = ({ banner, title, slug }: eventTypes.Event) => {
  return (
    <Card
      className="w-[350px] h-[320px] mx-2 rounded-xl overflow-hidden
                 shadow-lg border border-gray-200 flex flex-col
                 hover:shadow-xl transition"
    >
      {/* Image */}
      <CardMedia
        component="img"
        image={banner}
        alt={title}
        className="h-[160px] object-cover"
      />

      {/* Content */}
      <CardContent className="flex flex-col flex-1 gap-3">
        <Typography
          variant="body1"
          className="font-bold uppercase text-[16px] leading-snug
                     line-clamp-2"
        >
          {title}
        </Typography>

        <div className="mt-auto">
          <Link to={`/news/event/${slug}`}>
            <Button
              variant="contained"
              className="bg-green hover:bg-green-600"
            >
              Узнать больше
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
