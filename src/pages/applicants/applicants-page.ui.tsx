import {
  Typography,
  Container,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { t } from 'i18next'

export const ApplicantsPage = () => {
  return (
    <Container maxWidth="lg" className="py-10 px-4">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        {t('enrollPage.infoSection.title')}
      </Typography>

      <Grid container spacing={4}>
        {/* Раздел 1: Поступление на бюджет и контракт */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('applicantsPage.admission')}
            </Typography>
            <Typography variant="body1">
              {t('applicantsPage.paymentBenefits')}
            </Typography>
          </Box>
        </Grid>

        {/* Раздел 2: Регистрация и отбор абитуриентов */}
        <Grid item xs={12} md={6}>
          <Box flexDirection={'column'}>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('applicantsPage.registrationAndSelection')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('applicantsPage.electronicRegistration')}
            </Typography>
            <div className="flex flex-col">
              <a
                target="_blank"
                className="text-[25px] underline text-green"
                href="https://2020.edu.gov.kg/reports?id_university=30"
              >
                Для граждан Кыргызстана
              </a>
              <a
                target="_blank"
                className="text-[25px] underline text-green"
                href="https://edugate.edu.gov.kg/plan/30"
              >
                Для иностранных граждан
              </a>
            </div>
          </Box>
        </Grid>

        {/* Раздел 3: Документы для поступления */}
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('applicantsPage.documentsForElectronicRegistration')}
            </Typography>
            <List>
              {t('applicantsPage.documentsList', { returnObjects: true }).map(
                (item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Grid>

        {/* Раздел 4: Дополнительная информация */}
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" className="font-semibold mb-4">
              {t('applicantsPage.additionalInfo')}
            </Typography>
            <Typography variant="body1">
              {t('applicantsPage.additionalNotes')
                .split('\n')
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
