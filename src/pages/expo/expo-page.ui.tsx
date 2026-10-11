import {
  Globe,
  MessageSquare,
  BarChart2,
  Brain,
  Calendar,
  BookOpen,
  MessageCircle,
  Eye,
  TrendingUp,
  Monitor,
  Expand,
  ArrowUpRight,
} from 'lucide-react'
import { PageHero } from '~shared/ui/page'

const components = [
  {
    title: 'Официальный сайт МУИТ',
    description:
      'Современный веб-ресурс с информацией об университете, программах и возможностях для абитуриентов и студентов.',
    icon: Globe,
    link: 'https://intuit.kg',
  },
  {
    title: 'Платформа блогов makalabox.com',
    description:
      'Площадка для публикации научных статей, исследовательских работ и обмена знаниями между студентами и преподавателями.',
    icon: MessageSquare,
    link: 'https://makalabox.com',
  },
  {
    title: 'Рейтинговая система',
    description:
      'Система оценки и ранжирования студентов и преподавателей на основе их академических достижений и активности.',
    icon: BarChart2,
    link: 'https://bilimtrack.makalabox.com/tv',
  },
  {
    title: 'Платформа Tanda',
    description:
      'Инновационная система для анализа навыков абитуриентов, помогающая определить их сильные стороны и потенциал.',
    icon: Brain,
    link: 'https://bilimtrack.makalabox.com/tanda/test',
  },
  {
    title: 'Цифровое расписание',
    description:
      'Автоматизированная система составления и отслеживания расписания занятий для студентов и преподавателей.',
    icon: Calendar,
  },
  {
    title: 'Создание УМК',
    description:
      'Платформа для разработки и управления учебно-методическими комплексами дисциплин.',
    icon: BookOpen,
  },
  {
    title: 'Анонимная оценка преподавателей',
    description:
      'Система для конфиденциального сбора отзывов студентов о качестве преподавания и работе преподавателей.',
    icon: MessageCircle,
  },
]

const benefits = [
  {
    title: 'Прозрачность',
    description:
      'Открытый доступ к информации о процессах, рейтингах и оценках повышает доверие студентов и преподавателей.',
    icon: Eye,
  },
  {
    title: 'Мотивация',
    description:
      'Рейтинговая система стимулирует студентов и преподавателей к достижению лучших результатов и активному участию в жизни университета.',
    icon: TrendingUp,
  },
  {
    title: 'Цифровизация',
    description:
      'Автоматизация рутинных процессов позволяет сократить бюрократию и сосредоточиться на образовании и исследованиях.',
    icon: Monitor,
  },
  {
    title: 'Масштабируемость',
    description:
      'Модульная структура системы позволяет легко добавлять новые компоненты и расширять функциональность в будущем.',
    icon: Expand,
  },
]

export const ExpoPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        title="IT EXPO 2025 - МУИТ"
        subtitle="Образование, которое ведёт к реальной работе"
        image="/expo.png"
        imageAlt="IT EXPO 2025"
      />

      <section id="components" className="mt-14">
        <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
          Компоненты системы
        </h2>
        <ul className="mt-8 grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
          {components.map(({ title, description, icon: Icon, link }) => (
            <li
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={26} aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{description}</p>
              </div>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-green-dark"
                >
                  Открыть
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <span className="mt-auto inline-flex w-fit rounded-full bg-gray-light px-3 py-1 text-sm font-medium text-ink-soft">
                  В разработке
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="benefits" className="mt-14">
        <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
          Почему это важно
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-1">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <li
              key={title}
              className={`flex items-start gap-5 rounded-3xl p-7 sm:p-5 ${
                index === 0 ? 'bg-primary text-white' : 'bg-gray-light text-ink'
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  index === 0 ? 'bg-white/15' : 'bg-green-dark text-white'
                }`}
              >
                <Icon size={24} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p
                  className={`mt-2 text-[15px] leading-relaxed ${
                    index === 0 ? 'text-white/85' : 'text-ink-soft'
                  }`}
                >
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
