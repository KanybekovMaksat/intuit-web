import {
  Container,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import { t } from 'i18next';

export const WindowPage = () => {
  const services = [
    { name: t('windowPage.services.leaf'), time: t('time.oneDay') },
    { name: t('windowPage.services.studyCertificate'), time: t('time.oneDay') },
    { name: t('windowPage.services.militaryCertificate'), time: t('time.oneDay') },
    { name: t('windowPage.services.academicCertificate'), time: t('time.threeDays') },
    { name: t('windowPage.services.archiveCertificate'), time: t('time.threeDays') },
  ];

  return (
    <Container maxWidth="lg" className="py-10 px-4">
      <Typography variant="h4" className="font-semibold text-gray-700 mb-6">
     {t("windowPage.servicesWindow")}
      </Typography>

      <Typography className="text-gray-600 mb-6">
      {t("windowPage.digitalTransformationConcept")}
      </Typography>

      <TableContainer component={Paper} className="mb-8">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>
                <Typography className="font-semibold">{t("windowPage.service")}</Typography>
              </TableCell>
              <TableCell>
                <Typography className="font-semibold">
                  {t("windowPage.executionTime")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography className="text-gray-600 mb-4">
       {t("windowPage.readyCertificates")}
      </Typography>

      <Typography className="text-gray-600 mb-6">
        {t("windowPage.general")} <br />
        {t("windowPage.fullTime")} <br />
        {t("windowPage.partTime")}
      </Typography>

      <div>
        <a
        target='_blank'
          href="http://178.217.169.139:3000/lms/login"
          className=" border  p-2 rounded bg-green text-white border-white"
        >
         {t(".windowPage.applyForCertificate")}
        </a>
      </div>
    </Container>
  );
};
