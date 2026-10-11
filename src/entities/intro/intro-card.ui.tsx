import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHero, type Crumb } from '~shared/ui/page'

interface IntroCardProps {
  title?: string
  description?: string
  crumbs?: Crumb[]
  /** Show the "help me choose" button that scrolls to the application form. */
  withAction?: boolean
  /** Kept for existing call sites; the hero no longer uses a background photo. */
  img?: string
}

export const IntroCard = ({ title, description, crumbs, withAction }: IntroCardProps) => {
  const { t } = useTranslation()

  const goToForm = (event: React.MouseEvent) => {
    const form = document.getElementById('enroll-form')
    if (form) {
      event.preventDefault()
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <PageHero
      title={title}
      subtitle={description}
      crumbs={crumbs}
      actions={
        withAction ? (
          <a
            href="#enroll-form"
            onClick={goToForm}
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            {t('homepage.hero.helpButton', 'Помочь с выбором')}
            <ArrowRight size={18} aria-hidden />
          </a>
        ) : undefined
      }
    />
  )
}
