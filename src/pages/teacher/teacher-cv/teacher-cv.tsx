import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { staffQueries } from '~entities/staff'
import { Loader } from '~shared/ui/loader'

export const TeacherCv = () => {
  const { slug } = useParams()
  const { data, isLoading, isError } = staffQueries.useGetStaffDetail(slug || '')

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.dataNotLoaded')}</div>
  }

  return (
    <article className="mx-auto my-10 max-w-[860px] rounded-3xl border border-line bg-white p-10 sm:p-5">
      <div
        className="prose-muit prose-wide"
        dangerouslySetInnerHTML={{ __html: data?.data.cv }}
      />
    </article>
  )
}
