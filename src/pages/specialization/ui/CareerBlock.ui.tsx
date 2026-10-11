import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'
import { Title } from '~shared/ui/title'

export const CareerBlock = ({ professions }: specializationTypes.Specialization) => {
  if (!professions?.length) return null

  return (
    <section>
      <Title>{t('specialization.professionTitle')}</Title>
      <p className="-mt-3 mb-8 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink-soft">
        {t('specialization.professionDescription')}
      </p>

      <ul className="grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
        {professions.map((prof, index) => (
          <li
            key={`${prof.name}-${index}`}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6"
          >
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gray-light">
              {prof.photo ? (
                <img src={prof.photo} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl font-semibold text-primary">
                  {prof.name?.charAt(0)}
                </span>
              )}
            </span>
            <div>
              <h3 className="text-lg font-semibold leading-snug text-ink">{prof.name}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                {prof.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
