import RatingImg from './rating.jpg'
import VisionImg from './vision.webp'
import HistoryImg from './history.jpg'
import { documentQueries, documentTypes } from '~entities/document'
import { t } from 'i18next'
import { getApiList } from '~shared/lib/api/getApiList'
import { PageHero, LinkCard } from '~shared/ui/page'

export const AboutPage = () => {
  const { data: documentData } = documentQueries.useGetDocuments()
  const documents = getApiList<documentTypes.DocumentSchema>(documentData?.data)

  const links = [
    {
      title: t('aboutPage.links.historyTitle'),
      description: t('aboutPage.links.historyDescription'),
      to: '/history',
      image: HistoryImg,
    },
    {
      title: t('aboutPage.links.visionTitle'),
      description: t('aboutPage.links.visionDescription'),
      to: '/vision',
      image: VisionImg,
    },
    {
      title: t('aboutPage.links.ratingTitle'),
      description: t('aboutPage.links.ratingDescription'),
      href: 'https://rating.makalabox.com/',
      image: RatingImg,
    },
    {
      title: t('aboutPage.links.cssteapTitle'),
      description: t('aboutPage.links.cssteapDescription'),
      to: '/cssteapun',
      image: RatingImg,
    },
    {
      title: t('aboutPage.links.headTitle'),
      description: t('aboutPage.links.headDescription'),
      to: '/head',
      image:
        'https://i.pinimg.com/736x/32/97/2d/32972d6da61a2463e1de505863e67840.jpg',
    },
  ]

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('aboutPage.title', 'Об университете')}
        subtitle={t(
          'aboutPage.subtitle',
          'История, миссия, рейтинги и официальные документы МУИТ'
        )}
      />

      <ul className="mt-10 grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
        {links.map((link) => (
          <li key={link.title}>
            <LinkCard {...link} />
          </li>
        ))}
        {documents.map((document: documentTypes.DocumentSchema) => (
          <li key={document.slug}>
            <LinkCard
              title={document.title}
              description={document.subtitle}
              image={document.photo}
              to={`/document/${document.slug}`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
