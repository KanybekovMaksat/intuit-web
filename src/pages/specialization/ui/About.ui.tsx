import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'
import { Title } from '~shared/ui/title'

export const About = ({ text, subtext, textPhoto }: specializationTypes.Specialization) => {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] items-center gap-10 lg:grid-cols-1">
      <div>
        <Title>{text}</Title>
        {subtext && (
          <div className="prose-muit prose-wide" dangerouslySetInnerHTML={{ __html: subtext }} />
        )}
      </div>
      {textPhoto && (
        <img
          src={textPhoto}
          alt={t('specialization.professionPhoto')}
          loading="lazy"
          className="mt-14 w-full rounded-3xl bg-mist object-cover lg:mt-0 lg:max-h-[360px]"
        />
      )}
    </section>
  )
}
