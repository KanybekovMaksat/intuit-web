import { SpecializationBanner } from './ui/SpecializationBanner.ui'
import { SkillsBlock } from './ui/SkillBlock.ui'
import { CareerBlock } from './ui/CareerBlock.ui.tsx'
import { About } from './ui/About.ui.tsx'
import { RelatedPrograms } from './ui/RelatedPrograms.ui'
import { getProgramKind, getStudyForms } from './lib/kind'
import { EnrollForm } from '~widgets/enroll-form'
import { specializationQueries } from '~entities/specialization/'
import { useParams } from 'react-router-dom'
import { EducationForm } from '~widgets/education-form/education-form.ui.tsx'
import { t } from 'i18next'
import { Loader } from '~shared/ui/loader/loader.ui.tsx'

type RouteObject = {
  slug: string
}

export const SpecializationPage = () => {
  const { slug } = useParams<RouteObject>()
  const {
    data: specializationData,
    isLoading,
    isSuccess,
    isError,
  } = specializationQueries.useGetSpecialization(slug || '')

  if (!slug) {
    return (
      <div className="py-20 text-center text-ink-soft">
        {t('specialization.invalidAddress')}
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  if (!isSuccess) return null

  const program = specializationData.data
  const { isCourse } = getProgramKind(program.educationLevel)
  // Explanation of full/part-time study makes sense for degree programs only
  const studyForms = isCourse ? [] : getStudyForms(program.trainingForm)

  return (
    <div className="mb-10">
      <SpecializationBanner {...program} />
      <About {...program} />
      <SkillsBlock {...program} />
      <CareerBlock {...program} />
      {studyForms.length > 0 && <EducationForm forms={studyForms} />}
      <RelatedPrograms {...program} />
      <EnrollForm />
    </div>
  )
}
