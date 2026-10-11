import { facultyQueries } from '~entities/faculties'
import { IntroCard } from '~entities/intro'
import { EnrollForm } from '~widgets/enroll-form'
import { FacultyCard } from '~widgets/faculty-card'
import { OpportunitiesList } from '~widgets/opportunities-list'
import { t } from 'i18next'
import { Loader } from '~shared/ui/loader'
import { getApiList } from '~shared/lib/api/getApiList'
import { FacultySchema } from '~entities/faculties/faculty.types'

export const InstitutesPage = () => {
  const {
    data: facultyData,
    isLoading,
    isError,
  } = facultyQueries.useGetFaculties()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  const faculties = getApiList<FacultySchema>(facultyData?.data)

  return (
    <div className="mb-10">
      <IntroCard
        withAction
        title={t('institutesPage.introCard.title')}
        description={t('institutesPage.introCard.description')}
      />

      <ul className="mt-10 grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
        {faculties.map((institute) => (
          <li key={institute.slug}>
            <FacultyCard
              slug={institute.slug}
              instituteName={institute.subtitle}
              programCount={institute.programCount}
              icon={institute.icon}
            />
          </li>
        ))}
      </ul>

      <OpportunitiesList />
      <EnrollForm />
    </div>
  )
}
