import { useParams } from 'react-router-dom'
import { documentQueries } from '~entities/document'
import Fancybox from '~widgets/diplom-list/Fancybox'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Loader } from '~shared/ui/loader'
import { NewsList } from '~widgets/news-list'
import { InternationalStudents } from '~widgets/international-students'

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
    return <div>Произошла Ошибка</div>
  }

  if (isLoading) {
    return <Loader />
  }

  if (slug === 'for-international-students') {
    return (
      <>
        <InternationalStudents />
        <Container maxWidth="lg" className="pb-20">
          <NewsList 
            category={23 as any} 
            title={t('internationalPage.news')} 
          />
        </Container>
      </>
    )
  }

  if (!slug || !documentData) return null

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        {documentData?.data.title}
      </Typography>
      {/* <div
        className="my-10"
        dangerouslySetInnerHTML={{ __html: documentData?.data.content }}
      ></div> */}
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        {documentData.data.documentCollections.map((acc: any, i: number) => (
          <Accordion
            key={i}
            className="mb-4 border border-gray shadow-none rounded"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="text-gray-800 font-semibold">
                {acc.name}
              </Typography>
            </AccordionSummary>
            {acc.documentCollectionItems.map((doc: any, index: number) => (
              <AccordionDetails key={index}>
                <li key={index} className="mb-2">
                  <a
                    data-fancybox="gallery"
                    href={doc.document}
                    className="text-blue hover:text-blue-700"
                  >
                    {doc.name || `Открыть документ ${index + 1}`}
                  </a>
                </li>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Fancybox>
    </Container>
  )
}
