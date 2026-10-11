import { useParams } from 'react-router-dom'
import { EnrollForm } from '~widgets/enroll-form'
import { OpportunitiesList } from '~widgets/opportunities-list'
import { InstituteBanner } from './ui/InstituteBanner.ui'
import { facultyQueries } from '~entities/faculties'
import DescriptionCard from './ui/Description.ui'
import { NewsList } from '~widgets/news-list'
import { ProgramCategory } from '~widgets/programm-category'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { Documents } from './ui/Document.ui'
import { Loader } from '~shared/ui/loader'
import { t } from 'i18next'

export const InstitutePage = () => {
  const { slug } = useParams()

  const {
    data: facultyData,
    isError,
    isLoading,
  } = facultyQueries.useGetFaculty(String(slug))

  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  if (isLoading) {
    return <Loader />
  }

  const faculty = facultyData?.data

  return (
    <div className="mb-10">
      <InstituteBanner
        title={faculty?.title}
        subtitle={faculty?.subtitle}
        banner={faculty?.banner}
        programCount={faculty?.programCount}
        icon={faculty?.icon}
      />
      <ProgramCategory facultyId={faculty?.id} />
      <DescriptionCard
        subtitle={faculty?.subtitle}
        text={faculty?.text}
        subtext={faculty?.subtext}
        id={faculty?.id}
      />
      <Documents data={faculty?.documentCollections} />
      <EnrollForm />
      <OpportunitiesList />
      <NewsList id={faculty?.id} />
      <SpeakerVideoList facultyId={faculty?.id} />
    </div>
  )
}
