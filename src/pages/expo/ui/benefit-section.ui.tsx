import React from 'react'
import { Eye, TrendingUp, Monitor, Expand } from 'lucide-react'
import BenefitCard from './benefit-card.ui'

const benefits = [
  {
    title: 'Прозрачность',
    description:
      'Открытый доступ к информации о процессах, рейтингах и оценках повышает доверие студентов и преподавателей.',
    icon: <Eye className="h-8 w-8" />,
  },
  {
    title: 'Мотивация',
    description:
      'Рейтинговая система стимулирует студентов и преподавателей к достижению лучших результатов и активному участию в жизни университета.',
    icon: <TrendingUp className="h-8 w-8" />,
  },
  {
    title: 'Цифровизация',
    description:
      'Автоматизация рутинных процессов позволяет сократить бюрократию и сосредоточиться на образовании и исследованиях.',
    icon: <Monitor className="h-8 w-8" />,
  },
  {
    title: 'Масштабируемость',
    description:
      'Модульная структура системы позволяет легко добавлять новые компоненты и расширять функциональность в будущем.',
    icon: <Expand className="h-8 w-8" />,
  },
]

const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Почему это важно?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
