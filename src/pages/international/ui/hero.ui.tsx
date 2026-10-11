import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { degreeQueries } from '~entities/degree'
import { Loader } from '~shared/ui/loader'
import { FacultyCarousel } from './facultyCarousel'
import { getApiList } from '~shared/lib/api/getApiList'
import { DegreeSchema } from '~entities/degree/degree.types'
import { PageHero } from '~shared/ui/page'

export const InternationalHero = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = degreeQueries.useGetDegrees()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  const degrees = getApiList<DegreeSchema>(data?.data)

  const goToForm = (event: React.MouseEvent) => {
    const form = document.getElementById('enroll-form')
    if (form) {
      event.preventDefault()
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="mb-20">
      <PageHero
        title="For international students"
        subtitle="Education that leads to real work"
        actions={
          <a
            href="#enroll-form"
            onClick={goToForm}
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            {t('homepage.hero.helpButton', 'Помочь с выбором')}
            <ArrowRight size={18} aria-hidden />
          </a>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {degrees.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/degree/${item.slug}/`}
                className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-white/30 px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-primary"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <FacultyCarousel />
    </div>
  )
}
