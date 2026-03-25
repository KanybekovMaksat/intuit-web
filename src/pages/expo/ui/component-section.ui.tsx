import React from 'react'
import {
  Globe,
  MessageSquare,
  BarChart2,
  Brain,
  Calendar,
  BookOpen,
  MessageCircle,
} from 'lucide-react'
import ComponentCard from './component-card.ui'

const components = [
  {
    title: 'Официальный сайт МУИТ',
    description:
      'Современный веб-ресурс с информацией об университете, программах и возможностях для абитуриентов и студентов.',
    icon: <Globe className="h-10 w-10 text-blue-600" />,
    link: 'https://intuit.kg',
    status: 'active',
  },
  {
    title: 'Платформа блогов makalabox.com',
    description:
      'Площадка для публикации научных статей, исследовательских работ и обмена знаниями между студентами и преподавателями.',
    icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
    link: 'https://makalabox.com',
    status: 'active',
  },
  {
    title: 'Рейтинговая система',
    description:
      'Система оценки и ранжирования студентов и преподавателей на основе их академических достижений и активности.',
    icon: <BarChart2 className="h-10 w-10 text-blue-600" />,
    link: 'https://bilimtrack.makalabox.com/tv',
    status: 'active',
  },
  {
    title: 'Платформа Tanda',
    description:
      'Инновационная система для анализа навыков абитуриентов, помогающая определить их сильные стороны и потенциал.',
    icon: <Brain className="h-10 w-10 text-blue-600" />,
    link: 'https://bilimtrack.makalabox.com/tanda/test',
    status: 'active',
  },
  {
    title: 'Цифровое расписание',
    description:
      'Автоматизированная система составления и отслеживания расписания занятий для студентов и преподавателей.',
    icon: <Calendar className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
  {
    title: 'Создание УМК',
    description:
      'Платформа для разработки и управления учебно-методическими комплексами дисциплин.',
    icon: <BookOpen className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
  {
    title: 'Анонимная оценка преподавателей',
    description:
      'Система для конфиденциального сбора отзывов студентов о качестве преподавания и работе преподавателей.',
    icon: <MessageCircle className="h-10 w-10 text-blue-600" />,
    status: 'development',
  },
]

const ComponentsSection: React.FC = () => {
  return (
    <section id="components" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Компоненты системы
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-8 ">
          {components.map((component, index) => (
            <ComponentCard
              key={index}
              title={component.title}
              description={component.description}
              icon={component.icon}
              link={component.link}
              status={component.status}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComponentsSection
