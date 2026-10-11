import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'
import { getProgramKind } from '../lib/kind'

export const About = ({
  subtext,
  textPhoto,
  educationLevel,
}: specializationTypes.Specialization) => {
  const { isCourse } = getProgramKind(educationLevel)

  // The slogan from the CMS now lives in the hero, so the section heading stays neutral
  const heading = isCourse
    ? t('specialization.aboutCourse', 'О курсе')
    : t('specialization.aboutProgram', 'О программе')

  return (
    <section className="mt-16 grid grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] items-center gap-12 lg:mt-12 lg:grid-cols-1 lg:gap-8">
      <div>
        <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink text-balance md:text-[1.5rem]">
          {heading}
        </h2>
        {subtext && (
          <div
            className="prose-muit mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.75]"
            dangerouslySetInnerHTML={{ __html: subtext }}
          />
        )}
      </div>
      {textPhoto && (
        <img
          src={textPhoto}
          alt={t('specialization.professionPhoto')}
          loading="lazy"
          className="aspect-[4/3] max-h-[420px] w-full rounded-3xl bg-mist object-cover"
        />
      )}
    </section>
  )
}
