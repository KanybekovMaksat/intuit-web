import { useTranslation } from 'react-i18next'
import { BookOpen, Wrench } from 'lucide-react'
import { Title } from '~shared/ui/title'

interface EducationFormProps {
  /** Which forms to show; both by default. */
  forms?: ('full' | 'part')[]
}

export const EducationForm = ({ forms: only = ['full', 'part'] }: EducationFormProps) => {
  const { t } = useTranslation()

  const all = [
    {
      key: 'full' as const,
      title: t('homepage.education-form.title'),
      text: t('homepage.education-form.text'),
      icon: BookOpen,
      tone: 'bg-primary text-white',
      iconTone: 'bg-white/15 text-white',
      textTone: 'text-white/80',
    },
    {
      key: 'part' as const,
      title: t('homepage.education-form.secondTitle'),
      text: t('homepage.education-form.secondText'),
      icon: Wrench,
      tone: 'bg-gray-light text-ink',
      iconTone: 'bg-green-dark text-white',
      textTone: 'text-ink-soft',
    },
  ]
  const forms = all.filter((form) => only.includes(form.key))
  if (forms.length === 0) return null

  return (
    <section>
      <Title>{t('homepage.studyForms')}</Title>

      <ul
        className={`grid gap-5 md:grid-cols-1 ${forms.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
      >
        {forms.map(({ key, title, text, icon: Icon, tone, iconTone, textTone }) => (
          <li key={key} className={`flex flex-col gap-5 rounded-3xl p-8 sm:p-5 ${tone}`}>
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconTone}`}>
              <Icon size={24} aria-hidden />
            </span>
            <div>
              <h3 className="text-2xl font-semibold leading-snug tracking-tight">{title}</h3>
              <p className={`mt-2 max-w-[56ch] text-[1.0625rem] leading-relaxed ${textTone}`}>
                {text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
