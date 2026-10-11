import Fancybox from '~shared/ui/fancybox/Fancybox'
import { t } from 'i18next'
import { PageHero, FileCard } from '~shared/ui/page'

const base = 'https://intuit.kg/documents/head/'

const documents = [
  { key: '2020-2021', file: 'rectorate_regulations.pdf' },
  { key: 'march2021', file: 'rectorate_report_2020.pdf' },
  { key: 'aprilJuly2021', file: 'rectorate_april_2021.pdf' },
  { key: 'november2021', file: 'rectorate_november_2022.pdf' },
  { key: 'december2021January2022', file: 'rectorate_december_2022.docx' },
  { key: 'februaryJuly2022', file: 'rectorate_febraury_2022.pdf' },
  { key: 'october2022January2023', file: 'rectorate_octember_2023.pdf' },
  { key: 'januaryAugust2023', file: 'rectorate_january_2023.pdf' },
  { key: 'augustDecember2023', file: 'rectorate_august_2023.pdf' },
  { key: 'januaryAugust2024', file: 'rectorate_january_2024.pdf' },
  { key: 'augustDecember2024', file: 'rectorate_august_2024.pdf' },
  { key: 'januaryAugust2025', file: 'rectorate_januar_2025.pdf' },
  { key: '2020-2021_full', file: 'plan_rectorate_1.pdf' },
  { key: '2021-2022_full', file: 'plan_rectorate_2.pdf' },
  { key: '2022-2023_full', file: 'plan_rectorate_3.pdf' },
  { key: '2023-2024_full', file: 'plan_rectorate_4.pdf' },
  { key: '2024-2025_full', file: 'plan_rectorate_5.pdf' },
]

export const HeadPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('homepage.HeadPage.UniversityRectorate')}
        subtitle={t('homepage.HeadPage.content')}
        crumbs={[{ label: t('aboutPage.title', 'Об университете'), to: '/about' }]}
      />

      <Fancybox options={{ Carousel: { infinite: false } }}>
        <ul className="mt-10 grid grid-cols-3 gap-4 lg:grid-cols-2 md:grid-cols-1">
          {documents.map((doc) => (
            <li key={doc.key}>
              <FileCard
                title={t(`homepage.HeadPage.rectoratePlans.${doc.key}`)}
                href={base + doc.file}
              />
            </li>
          ))}
        </ul>
      </Fancybox>
    </div>
  )
}
