import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { t } from 'i18next'
import { IntroCard } from '~entities/intro'

export const EnrollPage = () => {
  return (
    <div>
      <IntroCard
        description={
          t("enrollPage.description")
        }
        img={
          'https://synergy.ru/assets/template/v5/new3/images/s_quiz/abiturientam-lg.webp'
        }
        title={t('enrollPage.title')}
      ></IntroCard>

      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {t("enrollPage.infoSection.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {t("enrollPage.infoSection.text1")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {t("enrollPage.infoSection.text2")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {t("enrollPage.infoSection.text3")}
            <a
              href="https://2020.edu.gov.kg/"
              target="_blank"
              rel="noopener noreferrer"
              >
              https://2020.edu.gov.kg/
            </a>{' '}
            и МУИТ.
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {t("enrollPage.infoSection.text4")}
            <a
              href="https://2020.edu.gov.kg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              2020.edu.gov.kg
            </a>{' '}
            (портал для граждан Кыргызской Республики) и
            <a
              href="https://edugate.edu.gov.kg"
              target="_blank"
              rel="noopener noreferrer"
            >
              edugate.edu.gov.kg
            </a>{' '}
            (портал приема граждан зарубежных стран), т.е. личное присутствие
            абитуриента не требуется.
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary={t("enrollPage.importantLinks.noMedCertificate")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.importantLinks.noDormitory")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.importantLinks.programList")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.importantLinks.brochure")} />
            </ListItem>
          </List>

          <Typography variant="h6" component="div">
            {t("enrollPage.documentsSection.title")}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.admissionProcedure")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.noORTNeeded")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.benefitsDocuments")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.bachelorFees")}/>
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.masterFees")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.documentsSection.internationalFees")} />
            </ListItem>
          </List>

          <Typography variant="h6" component="div">
            {t("enrollPage.foreignStudentsSection.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {t("enrollPage.foreignStudentsSection.text")}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={t("enrollPage.foreignStudentsSection.entranceExams.title")} />
            </ListItem>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText primary={t("enrollPage.foreignStudentsSection.entranceExams.item1")} />
              </ListItem>
              <ListItem>
                <ListItemText primary={t("enrollPage.foreignStudentsSection.entranceExams.item2")} />
              </ListItem>
              <ListItem>
                <ListItemText primary={t("enrollPage.foreignStudentsSection.entranceExams.item3")} />
              </ListItem>
              <ListItem>
                <ListItemText primary={t("enrollPage.foreignStudentsSection.entranceExams.item4")} />
              </ListItem>
            </List>
            <ListItem>
              <ListItemText primary={t("enrollPage.foreignStudentsSection.registration")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("enrollPage.foreignStudentsSection.documents")} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  )
}
