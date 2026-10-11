import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'

export const CareerBlock = ({ professions }: specializationTypes.Specialization) => {
  const list = (professions || []).filter((prof) => prof.name)
  if (!list.length) return null

  const single = list.length === 1
  // 1: wide card, 2 and 4: two columns, 3 / 5 / 6: three columns
  const columns = single
    ? 'grid-cols-1'
    : list.length === 2 || list.length === 4
      ? 'grid-cols-2 md:grid-cols-1'
      : 'grid-cols-3 lg:grid-cols-2 md:grid-cols-1'

  return (
    <section className="mt-16 lg:mt-12">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.5rem]">
        {t('specialization.professionTitle')}
      </h2>
      <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-soft">
        {t('specialization.professionDescription')}
      </p>

      <ul className={`mt-8 grid gap-5 ${columns}`}>
        {list.map((prof) => (
          <li
            key={prof.name}
            className={`overflow-hidden rounded-3xl bg-gray-light ${
              single
                ? 'grid grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:grid-cols-1'
                : 'flex flex-col'
            }`}
          >
            <div className={`relative bg-mist ${single ? 'min-h-[220px] md:aspect-[16/9] md:min-h-0' : 'aspect-[16/10]'}`}>
              {prof.photo ? (
                <img
                  src={prof.photo}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-primary">
                  {prof.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-5">
              <h3 className="text-xl font-semibold leading-snug text-ink">{prof.name}</h3>
              {prof.description && (
                <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
                  {prof.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
