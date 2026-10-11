import { Target, Handshake, Lightbulb, Building2 } from 'lucide-react'
import { PageHero, DocumentGroups } from '~shared/ui/page'

const documents = [
  {
    name: 'Диплом бакалавра',
    documentCollectionItems: [
      {
        name: 'Образец',
        document:
          'https://intuit.kg/media/faculty/images/documents/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D0%B0.png',
      },
    ],
  },
  {
    name: 'Диплом магистра',
    documentCollectionItems: [
      {
        name: 'Образец',
        document:
          'https://intuit.kg/media/faculty/images/documents/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%9C%D0%B0%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0.png',
      },
    ],
  },
  {
    name: 'Диплом специалиста',
    documentCollectionItems: [
      {
        name: 'Образец',
        document:
          'https://intuit.kg/media/faculty/images/documents/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B0.png',
      },
    ],
  },
]

const goals = [
  {
    icon: Lightbulb,
    text: 'Модернизация деятельности учебно-образовательного комплекса через наращивание научного потенциала ППС.',
  },
  {
    icon: Handshake,
    text: 'Тесное сотрудничество с работодателями для модернизации учебных программ.',
  },
  {
    icon: Target,
    text: 'Разработка и внедрение инновационных образовательных программ, востребованных на рынке труда.',
  },
  {
    icon: Building2,
    text: 'Улучшение материально-технической базы образовательной и научной деятельности.',
  },
]

export const DocumentsPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        compact
        title="Департамент качества образования"
        subtitle="Координирует образовательный процесс и работу подразделений университета по управлению качеством образования, чтобы удовлетворять потребности работодателей, студентов, родителей и общества."
      />

      <section className="mt-10 rounded-3xl bg-gray-light p-8 sm:p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Миссия МУИТ</h2>
        <p className="mt-3 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Подготовка конкурентоспособных специалистов, отвечающих требованиям и ожиданиям
          заинтересованных сторон, владеющих инновационными технологиями, способных
          эффективно решать инженерные и социально-экономические проблемы современного
          общества.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          Стратегические цели
        </h2>
        <ul className="mt-6 grid grid-cols-4 gap-4 xll:grid-cols-2 md:grid-cols-1">
          {goals.map(({ icon: Icon, text }) => (
            <li key={text} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={22} aria-hidden />
              </span>
              <p className="text-[15px] leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          Документы
        </h2>
        <DocumentGroups groups={documents} openFirst />
      </section>
    </div>
  )
}
