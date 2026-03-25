import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Link,
} from '@mui/material'
import ComtehnoLogo from './comtehno-logo.png' // Add appropriate logos
import InnovativeCollegeLogo from './innovative-college-logo.png'
import { NewsList } from '~widgets/news-list'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { EnrollForm } from '~widgets/enroll-form'
import { t } from 'i18next'

export const CollegesPage = () => {
  return (
    <section className="my-10">
      <Container maxWidth="lg" className="py-10 px-4">
        <Typography
          variant="h4"
          className="font-bold text-center mb-8 text-gray-800"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
        >
          {t('homepage.degrees.colleges')}
        </Typography>

        <Typography
          variant="body1"
          className="text-gray-700 mb-6"
          style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', lineHeight: 1.6 }}
        >
          {t('collegesPage.after9Or11')}
        </Typography>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="https://comtehno.kg"
            className="no-underline"
            target="_blank"
            rel="noopener"
          >
            <Card className="flex flex-col mb-4 border border-gray shadow-none hover:shadow-lg p-4 w-full max-w-lg items-center h-full">
              <CardMedia
                component="img"
                alt={t('collegesPage.comtehnoCard.title')}
                image={ComtehnoLogo}
                className="h-[120px] w-[120px] object-cover"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="h5"
                  className="text-lg font-semibold mb-2 sm:text-center"
                >
                  {t('collegesPage.comtehnoCard.title')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2 sm:text-center"
                >
                  {t('collegesPage.comtehnoCard.description')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="text-blue-500 sm:text-center"
                >
                  {t('collegesPage.comtehnoCard.moreInfo')}
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="https://itec.kg/"
            className="no-underline"
            target="_blank"
            rel="noopener"
          >
            <Card className="flex flex-col  mb-4 border border-gray shadow-none hover:shadow-lg p-4 w-full max-w-lg items-center h-full">
              <div className="bg-blue inline-block w-[120px] rounded">
                <CardMedia
                  component="img"
                  alt="Innovative College Logo"
                  image={InnovativeCollegeLogo}
                  className="h-[120px] w-[120px] object-cover"
                />
              </div>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h5"
                  className="text-lg font-semibold mb-2 sm:text-center"
                >
                  {t('collegesPage.itecCard.title')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2 sm:text-center"
                >
                  {t('collegesPage.itecCard.description')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="text-blue-500 sm:text-center"
                >
                  {t('collegesPage.itecCard.moreInfo')}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </div>
        <Typography
          variant="body1"
          className="text-gray-700 mt-6"
          style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', lineHeight: 1.6 }}
        >
          {t('collegesPage.careerOpportunities')}
        </Typography>
      </Container>
      <NewsList />
      <SpeakerVideoList />
      <EnrollForm />
    </section>
  )
}
