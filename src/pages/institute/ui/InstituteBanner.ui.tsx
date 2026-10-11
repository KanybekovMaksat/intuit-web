import { useTranslation } from 'react-i18next'
import { PageHero } from '~shared/ui/page'

type FacultyPageType = {
  subtitle?: string
  title?: string
  banner?: string
  programCount?: number
  icon?: string
}

export const InstituteBanner: React.FC<FacultyPageType> = ({
  title,
  banner,
  programCount,
}) => {
  const { t } = useTranslation()

  return (
    <PageHero
      title={title}
      image={banner}
      crumbs={[{ label: t('header.institutes', 'Институты'), to: '/institutes/' }]}
    >
      <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold tabular-nums">
        {t('institutPage.specializations', 'Специализации')}: {programCount}
      </span>
    </PageHero>
  )
}
