import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Marquee from 'react-fast-marquee'
import { Link } from 'react-router-dom'
import {
  Globe,
  MessageSquare,
  BarChart2,
  Brain,
  Calendar,
  BookOpen,
  MessageCircle,
} from 'lucide-react'

const components = [
  {
    title: 'Официальный сайт МУИТ',
    description:
      'Информация об университете, программах и студенческих возможностях.',
    icon: <Globe className="h-10 w-10 text-blue-600" />,
    link: 'https://intuit.kg',
    status: 'active',
  },
  {
    title: 'Платформа Makalabox',
    description: 'Платформа для публикации научных статей и обмена знаниями.',
    icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
    link: 'https://makalabox.com',
    status: 'active',
  },
  {
    title: 'Рейтинговая система',
    description:
      'Оценка студентов и преподавателей по успеваемости и активности.',
    icon: <BarChart2 className="h-10 w-10 text-blue-600" />,
    link: 'https://bilimtrack.makalabox.com/tv',
    status: 'active',
  },
  {
    title: 'Платформа Tanda',
    description: 'Анализ навыков абитуриентов и их потенциала.',
    icon: <Brain className="h-10 w-10 text-blue-600" />,
    link: 'https://bilimtrack.makalabox.com/tanda/test',
    status: 'active',
  },
  {
    title: 'Цифровое расписание',
    description: 'Онлайн-система расписаний для студентов и преподавателей.',
    icon: <Calendar className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
  {
    title: 'Создание УМК',
    description: 'Платформа для управления учебно-методическими материалами.',
    icon: <BookOpen className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
  {
    title: 'Оценка преподавателей',
    description: 'Анонимный сбор отзывов о преподавании.',
    icon: <MessageCircle className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
]

export const HeroCarousel: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className="w-full overflow-hidden">
      <Marquee direction="left" speed={60} gradient={false}>
        <div className="flex items-center gap-4 ml-4 r-sm:gap-3 r-sm:ml-3">
          {components.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between backdrop-blur-xl bg-white/30 p-4 rounded-xl text-black shadow-md w-[320px] min-h-[130px] max-h-[130px] sm:w-[260px] h-auto sm:flex-col sm:items-start"
            >
              <div className="flex gap-3 sm:gap-2 sm:flex-col items-start">
                <div className="bg-white p-2 rounded-md">{item.icon}</div>
                <div className="flex flex-col gap-1 text-white">
                  <Typography
                    variant="h6"
                    className="text-sm font-semibold truncate max-w-[180px]"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-xs text-gray-700 line-clamp-3"
                  >
                    {item.description}
                  </Typography>
                  {item.status === 'active' ? (
                    <Link
                      to={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue text-white text-xs px-2 py-1 rounded mt-1 inline-block"
                    >
                      Перейти
                    </Link>
                  ) : (
                    <div className="text-[11px] text-gray-500 italic mt-1">
                      В разработке
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}
