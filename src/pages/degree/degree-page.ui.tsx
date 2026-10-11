import InfoBlock from './ui/info-block.ui'
import { MagistracyGuide } from './ui/magistracy-guide.ui'
import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { t } from 'i18next'
import { degreeQueries } from '~entities/degree'
import { Loader } from '~shared/ui/loader'
import { PageHero } from '~shared/ui/page'
import { EnrollForm } from '~widgets/enroll-form'
import { OpportunitiesList } from '~widgets/opportunities-list'
import { ProgramCategory } from '~widgets/programm-category'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { DissertationDiscussion } from '~widgets/dissertation-discussion'
import { dissertationLib } from '~entities/dissertation'

export const DegreePage = () => {
  const { slug } = useParams()
  const {
    data: degreeData,
    isLoading,
    isError,
  } = degreeQueries.useGetDegree(String(slug))

  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  if (isLoading) {
    return <Loader />
  }

  const degree = degreeData?.data

  const goToForm = (event: React.MouseEvent) => {
    const form = document.getElementById('enroll-form')
    if (form) {
      event.preventDefault()
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="mb-10">
      <PageHero
        title={degree?.title}
        subtitle="Пройдите тест и узнайте, на кого вам лучше учиться"
        actions={
          <a
            href="#enroll-form"
            onClick={goToForm}
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            Подобрать программу
            <ArrowRight size={18} aria-hidden />
          </a>
        }
      />

      <InfoBlock
        title={degree?.text}
        description={degree?.subtext}
        tags={['Выпускники', 'Бакалавриат']}
        diplomaPhoto={degree?.diplomaPhoto}
        stats={[
          { value: `${degree?.programCount}`, label: 'программ' },
          { value: `${degree?.studyPeriod}`, label: 'срок обучения' },
          { value: `${degree?.employment}`, label: 'Трудоустройство' },
          { value: 'Документ', label: `${degree?.diploma}` },
        ]}
      />

      {slug === 'magistratura' && <MagistracyGuide />}

      <ProgramCategory degreeId={degree?.id} />
      {slug === dissertationLib.PHD_DEGREE_SLUG && <DissertationDiscussion />}
      <OpportunitiesList />
      <EnrollForm />
      <SpeakerVideoList />
    </div>
  )
}
