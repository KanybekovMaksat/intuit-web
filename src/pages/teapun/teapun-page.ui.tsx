import Fancybox from '~shared/ui/fancybox/Fancybox'
import { t } from 'i18next'
import { PageHero, FileCard } from '~shared/ui/page'

const documents = [
  {
    titleKey: 'teapenPage.documentTitle1',
    link: 'https://intuit.kg/documents/24th%20GB_Meeting_Dec_12_2019_Minutes_removed.pdf',
  },
  {
    titleKey: 'teapenPage.documentTitle2',
    link: 'https://intuit.kg/documents/25th%20GB_Meeting_Dec_10_2020_removed.pdf',
  },
  {
    titleKey: 'teapenPage.documentTitle3',
    link: 'https://intuit.kg/documents/26th%20GB_Meeting_Dec_22_2021_removed_removed.pdf',
  },
  {
    titleKey: 'teapenPage.documentTitle4',
    link: 'https://intuit.kg/documents/27th%20GB_Meeting_Dec_14_2022_removed_removed.pdf',
  },
  {
    titleKey: 'teapenPage.documentTitle5',
    link: 'https://intuit.kg/documents/28TH%20GB_Meeting_Dec_12_2023_removed_removed.pdf',
  },
]

export const TeapunPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        compact
        title="Centre for Space Science and Technology Education in Asia and the Pacific (CSSTEAP)"
        subtitle={t('teapenPage.title')}
        crumbs={[{ label: t('aboutPage.title', 'Об университете'), to: '/about' }]}
      />

      <Fancybox options={{ Carousel: { infinite: false } }}>
        <ul className="mt-10 grid grid-cols-3 gap-4 lg:grid-cols-2 md:grid-cols-1">
          {documents.map((doc) => (
            <li key={doc.titleKey}>
              <FileCard title={t(doc.titleKey)} href={doc.link} />
            </li>
          ))}
        </ul>
      </Fancybox>
    </div>
  )
}
