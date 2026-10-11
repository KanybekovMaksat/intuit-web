import { useTranslation } from 'react-i18next'
import { Title } from '~shared/ui/title'
import { DocumentGroups, type DocumentGroup } from '~shared/ui/page'

interface DocumentsProps {
  data?: DocumentGroup[]
}

export const Documents = ({ data }: DocumentsProps) => {
  const { t } = useTranslation()

  if (!data || data.length === 0) return null

  return (
    <section>
      <Title>{t('institutPage.documents', 'Документы Университета')}</Title>
      <DocumentGroups groups={data} />
    </section>
  )
}
