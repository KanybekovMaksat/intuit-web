import { Link } from 'react-router-dom'
import { ChevronRight, Phone } from 'lucide-react'
import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'
import { getProgramKind, levelTitles } from '../lib/kind'

const scrollToForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const form = document.getElementById('enroll-form')
  if (!form) return
  event.preventDefault()
  form.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export const SpecializationBanner = ({
  title,
  text,
  photo,
  educationLevel,
  phoneNumber,
  studyPeriod,
  trainingForm,
  employment,
  diploma,
  contractPrice,
}: specializationTypes.Specialization) => {
  const levels = levelTitles(educationLevel)
  const { isCourse } = getProgramKind(educationLevel)
  const phoneHref = phoneNumber ? `tel:${String(phoneNumber).replace(/[^+\d]/g, '')}` : ''

  // The CMS slogan makes a good lead line, unless it only repeats the title
  const lead = text && text.trim().toLowerCase() !== title.trim().toLowerCase() ? text.trim() : ''

  const facts = [
    { label: t('specialization.studyDuration'), value: studyPeriod },
    { label: t('specialization.format'), value: trainingForm },
    { label: t('specialization.employment', 'Трудоустройство'), value: employment },
    {
      label:
        isCourse || /диплом/i.test(String(diploma || ''))
          ? t('specialization.document', 'Документ')
          : t('specialization.diploma', 'Диплом'),
      value: diploma,
    },
    { label: t('specialization.contractPrice', 'Стоимость контракта'), value: contractPrice },
  ].filter((fact) => fact.value && String(fact.value).trim())

  return (
    <header
      className="relative mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] overflow-hidden rounded-3xl bg-primary text-white lg:grid-cols-1 sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(55% 70% at 0% 100%, rgba(0,149,111,0.42) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      <div className="relative z-10 flex flex-col gap-8 p-10 lg:order-2 lg:p-8 sm:p-5">
        <div>
          <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  {t('specialization.home')}
                </Link>
              </li>
              <ChevronRight size={14} aria-hidden className="text-white/40" />
              <li>{t('specialization.directions', 'Направление')}</li>
            </ol>
          </nav>

          {levels.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {levels.map((level) => (
                <li
                  key={level}
                  className="inline-flex h-8 items-center rounded-full bg-white px-3.5 text-[13px] font-semibold text-primary"
                >
                  {level}
                </li>
              ))}
            </ul>
          )}

          <h1 className="mt-4 max-w-[20ch] text-[3rem] font-semibold leading-[1.05] tracking-tight text-balance xl:text-[2.6rem] lg:text-[2.25rem] sm:text-[1.7rem]">
            {title}
          </h1>

          {lead && (
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/80 sm:text-base">
              {lead}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#enroll-form"
            onClick={scrollToForm}
            className="inline-flex h-12 items-center whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-green-dark hover:text-white active:scale-[0.98]"
          >
            {t('header.apply', 'Подать заявку')}
          </a>
          {phoneNumber && (
            <a
              href={phoneHref}
              className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-semibold text-white ring-1 ring-white/30 transition-colors duration-200 hover:bg-white/10"
            >
              <Phone size={16} aria-hidden />
              {phoneNumber}
            </a>
          )}
        </div>

        {facts.length > 0 && (
          <dl className="mt-auto grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-6 gap-y-5 border-t border-white/15 pt-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[13px] text-white/60">{fact.label}</dt>
                <dd className="mt-1 text-[15px] font-semibold leading-snug first-letter:uppercase">
                  {String(fact.value).trim()}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="relative min-h-[420px] lg:order-1 lg:aspect-[16/9] lg:min-h-0 md:hidden">
        <img src={photo} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        {/* soft hand-off from the navy panel into the photo */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary to-transparent lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-primary/80 to-transparent lg:block"
        />
      </div>
    </header>
  )
}
