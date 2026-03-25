import { useParams } from 'react-router-dom'
import { EnrollForm } from '~widgets/enroll-form'
import { OpportunitiesList } from '~widgets/opportunities-list'
// import StaffList from '~widgets/staff-list/staff-list.ui'
import { InstituteBanner } from './ui/InstituteBanner.ui'
import { facultyQueries } from '~entities/faculties'
import DescriptionCard from './ui/Description.ui'
// import ProgramCategory from './ui/ProgramCategory.ui';
import { NewsList } from '~widgets/news-list'
import { ProgramCategory } from '~widgets/programm-category'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { Documents } from './ui/Document.ui'
import { Loader } from '~shared/ui/loader'

export const InstitutePage = () => {
  const slug = useParams()

  const {
    data: facultyData,
    isError,
    isLoading,
  } = facultyQueries.useGetFaculty(String(slug.slug))

  console.log('facultyData', facultyData)

  if (isError) {
    return <div>Произошла Ошибка</div>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="my-5">
      <InstituteBanner
        title={facultyData?.data.title}
        subtitle={facultyData?.data.subtitle}
        banner={facultyData?.data.banner}
        programCount={facultyData?.data.programCount}
        icon={facultyData?.data.icon}
      />
      <ProgramCategory facultyId={facultyData?.data.id} />
      <DescriptionCard
        subtitle={facultyData?.data.subtitle}
        text={facultyData?.data.text}
        subtext={facultyData?.data.subtext}
        id={facultyData?.data.id}
      />
      <Documents data={facultyData?.data?.documentCollections} />
      <EnrollForm />
      <OpportunitiesList />
      <NewsList id={facultyData?.data.id} />
      <SpeakerVideoList facultyId={facultyData?.data.id} />
    </div>
  )
}
