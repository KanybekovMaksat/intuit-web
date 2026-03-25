import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  IconButton,
} from '@mui/material'
import { FileCopy as FileIcon } from '@mui/icons-material'
import Fancybox from '~widgets/diplom-list/Fancybox'
import { t } from 'i18next'

export const HeadPage = () => {
  const documents = [
    {
      title: t('homepage.HeadPage.rectoratePlans.2020-2021'),
      link: 'https://intuit.kg/documents/head/rectorate_regulations.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.march2021'),
      link: 'https://intuit.kg/documents/head/rectorate_report_2020.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.aprilJuly2021'),
      link: 'https://intuit.kg/documents/head/rectorate_april_2021.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.november2021'),
      link: 'https://intuit.kg/documents/head/rectorate_november_2022.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.december2021January2022'),
      link: 'https://intuit.kg/documents/head/rectorate_december_2022.docx',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.februaryJuly2022'),
      link: 'https://intuit.kg/documents/head/rectorate_febraury_2022.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.october2022January2023'),
      link: 'https://intuit.kg/documents/head/rectorate_octember_2023.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.januaryAugust2023'),
      link: 'https://intuit.kg/documents/head/rectorate_january_2023.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.augustDecember2023'),
      link: 'https://intuit.kg/documents/head/rectorate_august_2023.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.januaryAugust2024'),
      link: 'https://intuit.kg/documents/head/rectorate_january_2024.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.augustDecember2024'),
      link: 'https://intuit.kg/documents/head/rectorate_august_2024.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.januaryAugust2025'),
      link: 'https://intuit.kg/documents/head/rectorate_januar_2025.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.2020-2021_full'),
      link: 'https://intuit.kg/documents/head/plan_rectorate_1.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.2021-2022_full'),
      link: 'https://intuit.kg/documents/head/plan_rectorate_2.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.2022-2023_full'),
      link: 'https://intuit.kg/documents/head/plan_rectorate_3.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.2023-2024_full'),
      link: 'https://intuit.kg/documents/head/plan_rectorate_4.pdf',
    },
    {
      title: t('homepage.HeadPage.rectoratePlans.2024-2025_full'),
      link: 'https://intuit.kg/documents/head/plan_rectorate_5.pdf',
    },
  ]

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        {t('homepage.HeadPage.UniversityRectorate')}
      </Typography>
      <Typography
        variant="body1"
        className="text-gray-700 mb-10 text-justify"
        style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
      >
        {t('homepage.HeadPage.content')}
      </Typography>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <Grid container spacing={4}>
          {documents.map((document, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <a href={document.link} data-fancybox="gallery">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <IconButton>
                          <FileIcon />
                        </IconButton>
                        <Typography variant="h6" component="div">
                          {document.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>
      </Fancybox>
    </Container>
  )
}
