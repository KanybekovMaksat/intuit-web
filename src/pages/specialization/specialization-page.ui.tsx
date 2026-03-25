import { SpecializationBanner } from './ui/SpecializationBanner.ui'
import { SkillsBlock } from './ui/SkillBlock.ui'
import { CareerBlock } from './ui/CareerBlock.ui.tsx'
import { About } from './ui/About.ui.tsx'
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

  if (!slug) {
    return (
      <div>
        {t('specialization.invalidAddress')} {slug}
      </div>
    )
  }
  const {
    data: specializationData,
    isLoading,
    isSuccess,
    isError,
  } = specializationQueries.useGetSpecialization(slug)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>{t('loading.error')}</div>
  }
  if (isSuccess) {
    return (
      <div className="my-5">
        <SpecializationBanner {...specializationData.data} />
        <About {...specializationData.data} />
        {/* <ProgramBlocks {...specializationData.data} /> */}
        <SkillsBlock {...specializationData.data} />
        {/* <ProgramAccordion {...specializationData.data} /> */}
        <CareerBlock {...specializationData.data} />
        <EducationForm />
        <EnrollForm />
      </div>
    )
  }
}
