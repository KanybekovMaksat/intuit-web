import React from 'react'
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

export const TeapunPage = () => {
  const documents = [
    {
      titleKey: t('teapenPage.documentTitle1'),
      link: 'https://intuit.kg/documents/24th%20GB_Meeting_Dec_12_2019_Minutes_removed.pdf',
    },
    {
      titleKey: t('teapenPage.documentTitle2'),
      link: 'https://intuit.kg/documents/25th%20GB_Meeting_Dec_10_2020_removed.pdf',
    },
    {
      titleKey: t('teapenPage.documentTitle3'),
      link: 'https://intuit.kg/documents/26th%20GB_Meeting_Dec_22_2021_removed_removed.pdf',
    },
    {
      titleKey: t('teapenPage.documentTitle4'),
      link: 'https://intuit.kg/documents/27th%20GB_Meeting_Dec_14_2022_removed_removed.pdf',
    },
    {
      titleKey: t('teapenPage.documentTitle5'),
      link: 'https://intuit.kg/documents/28TH%20GB_Meeting_Dec_12_2023_removed_removed.pdf',
    },
  ]

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        Centre for Space Science and Technology Education in Asia and the
        Pacific (CSSTEAP)
      </Typography>
      <Typography
        variant="body1"
        className="text-gray-700 mb-10 text-justify"
        style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
      >
        {t('teapenPage.title')}
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
