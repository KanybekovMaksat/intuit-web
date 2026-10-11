import { useParams } from 'react-router-dom'
import { documentQueries } from '~entities/document'
import { Loader } from '~shared/ui/loader'
import { NewsList } from '~widgets/news-list'
import { InternationalStudents } from '~widgets/international-students'
import { PageHero, DocumentGroups } from '~shared/ui/page'

import { useTranslation } from 'react-i18next'

export const DocumentPage = () => {
  const { slug } = useParams()
  const { t } = useTranslation()

  const {
    data: documentData,
    isError,
    isLoading,
  } = documentQueries.useGetDetailsDocuments(slug as string)

  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.error')}</div>
  }

  if (isLoading) {
    return <Loader />
  }

  if (slug === 'for-international-students') {
    return (
      <>
        <InternationalStudents />
        <div className="w-full pb-20 px-12 md:px-6 sm:px-4">
          <NewsList category={23 as any} title={t('internationalPage.news')} />
        </div>
      </>
    )
  }

  if (!slug || !documentData) return null

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={documentData.data.title}
        crumbs={[{ label: t('aboutPage.title', 'Об университете'), to: '/about' }]}
      />
      <section className="mt-10">
        <DocumentGroups groups={documentData.data.documentCollections} openFirst />
      </section>
    </div>
  )
}
