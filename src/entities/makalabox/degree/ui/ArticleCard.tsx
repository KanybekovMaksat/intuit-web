import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { articleTypes } from '..'

type ArticleCardProps = { article: articleTypes.Article }

export const ArticleCard = (props: ArticleCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <Card className="shadow-none border  border-gray" sx={{ maxWidth: 365 }}>
      <div
        className="pointer h-full"
        onClick={() =>
          window.open(
            `https://makalabox.com/article/${props.article.id}/`,
            '_blank',
            'noopener, noreferrer'
          )
        }
      >
        <CardActionArea className="h-full">
          <CardMedia
            component="img"
            className="min-h-[220px] object-cover max-h-[220px]"
            image={props.article.photo}
            alt="green iguana"
          />
          <CardContent className="flex flex-col justify-between h-full">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-[18px]  font-semibold"
            >
              {truncateText(props.article.title, 40)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncateText(props.article.subtitle, 70)}
            </Typography>
            <Button
              onClick={() =>
                window.open(
                  `https://makalabox.com/article/${props.article.id}/`,
                  '_blank',
                  'noopener, noreferrer'
                )
              }
              variant="contained"
              className="bg-blue shadow-none text-white mt-2"
            >
              Читать дальше
            </Button>
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  )
}
