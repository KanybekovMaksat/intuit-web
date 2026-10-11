import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'

export const SpecializationBanner = ({
  title,
  studyPeriod,
  trainingForm,
  diploma,
  photo,
  educationLevel,
  phoneNumber,
  contractPrice,
}: specializationTypes.Specialization) => {
  const facts = [
    { label: t('specialization.level'), value: educationLevel?.[0] },
    { label: t('specialization.studyDuration'), value: studyPeriod },
    { label: t('specialization.format'), value: trainingForm },
    { label: t('specialization.result'), value: diploma },
    { label: t('specialization.phone', 'Номер телефона'), value: phoneNumber },
    { label: t('specialization.contractPrice', 'Стоимость контракта'), value: contractPrice },
  ].filter((fact) => fact.value !== undefined && fact.value !== null && fact.value !== '')

  return (
    <header
      className="relative mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] overflow-hidden rounded-3xl bg-primary text-white md:grid-cols-1 sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(60% 80% at 0% 100%, rgba(0,149,111,0.45) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      <div className="flex flex-col justify-between gap-10 p-10 md:order-2 md:p-6 sm:p-4">
        <div>
          <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  {t('specialization.home')}
                </Link>
              </li>
              <ChevronRight size={14} aria-hidden className="text-white/40" />
              <li className="text-white/70">{t('specialization.directions', 'Направление')}</li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-[22ch] text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-balance lg:text-4xl md:text-[1.9rem] sm:text-[1.6rem]">
            {title}
          </h1>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {facts.map((fact) => (
            <li
              key={fact.label}
              className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15"
            >
              <p className="text-xs text-white/65">{fact.label}</p>
              <p className="mt-1 text-[15px] font-semibold leading-snug break-words">
                {fact.value}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-h-[320px] md:order-1 md:min-h-[240px]">
        <img src={photo} alt={title} className="h-full w-full object-cover" />
      </div>
    </header>
  )
}
