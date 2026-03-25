import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import Fancybox from '~shared/ui/fancybox/Fancybox'
import { ExpandMore } from '@mui/icons-material/'
import { Title } from '~shared/ui/title'

export const Documents = ({ data }) => {
  if (data.length > 0) {
    return (
      <>
        <section className="my-20">
          <Title>Документы Университета</Title>
          <Fancybox
            options={{
              Carousel: {
                infinite: false,
              },
            }}
          >
            {data?.map((acc, i) => (
              <Accordion className="mb-4 border border-gray shadow-none rounded">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography className="text-gray-800 font-semibold">
                    {acc.name}
                  </Typography>
                </AccordionSummary>
                {acc.documentCollectionItems.map((doc, index) => (
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
        </section>
      </>
    )
  }
}
