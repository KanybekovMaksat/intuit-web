import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const HistoryPage = () => {
  const { t, i18n } = useTranslation();

  const [bachelorPrograms, setBachelorPrograms] = useState([]);
  const [masterPrograms, setMasterPrograms] = useState([]);
  const [postgraduateSpecialties, setPostgraduateSpecialties] = useState([]);
  const [additionalCourses, setAdditionalCourses] = useState([]);
  const [structureItems, setStructureItems] = useState([]);

  useEffect(() => {
    if (!i18n.isInitialized) return;

    const bachelorRaw = [
      { codeKey: "historypage.code1", programKey: "historypage.program1", profileKey: "historypage.profile1" },
      { codeKey: "historypage.code2", programKey: "historypage.program2", profileKey: "historypage.profile2" },
      { codeKey: "historypage.code3", programKey: "historypage.program3", profileKey: "historypage.profile3" },
      { codeKey: "historypage.code4", programKey: "historypage.program4", profileKey: "historypage.profile4" },
      { codeKey: "historypage.code5", programKey: "historypage.program5", profileKey: "historypage.profile5" },
      { codeKey: "historypage.code6", programKey: "historypage.program6", profileKey: "historypage.profile6" },
      { codeKey: "historypage.code7", programKey: "historypage.program7", profileKey: "historypage.profile7" },
      { codeKey: "historypage.code8", programKey: "historypage.program8", profileKey: "historypage.profile8" },
      { codeKey: "historypage.code9", programKey: "historypage.program9", profileKey: "historypage.profile9" },
      { codeKey: "historypage.code10", programKey: "historypage.program10", profileKey: "historypage.profile10" },
      { codeKey: "historypage.code11", programKey: "historypage.program11", profileKey: "historypage.profile11" },
      { codeKey: "historypage.code12", programKey: "historypage.program12", profileKey: "historypage.profile2" },
      { codeKey: "historypage.code13", programKey: "historypage.program13", profileKey: "historypage.profile13" },
      { codeKey: "historypage.code14", programKey: "historypage.program14", profileKey: "historypage.profile14" },
      { codeKey: "historypage.code15", programKey: "historypage.program15", profileKey: "historypage.profile15" },
      { codeKey: "historypage.code16", programKey: "historypage.program16", profileKey: "historypage.profile16" },
      { codeKey: "historypage.code17", programKey: "historypage.program17", profileKey: "historypage.profile17" },
      { codeKey: "historypage.code18", programKey: "historypage.program18", profileKey: "historypage.profile18" },
    ]
      .map((item) => ({
        ...item,
        code: t(item.codeKey),
        program: t(item.programKey),
        profile: t(item.profileKey),
      }))
      .filter((item) =>
        item.code !== item.codeKey &&
        item.program !== item.programKey &&
        item.profile !== item.profileKey
      )
      .sort((a, b) => a.program.localeCompare(b.program));

    setBachelorPrograms(bachelorRaw);

    const masterRaw = [
      { codeKey: "historypage.masterPrograms.code1", programKey: "historypage.masterPrograms.program1", detailsKey: "historypage.masterPrograms.details1" },
      { codeKey: "historypage.masterPrograms.code2", programKey: "historypage.masterPrograms.program2", detailsKey: "historypage.masterPrograms.details2" },
      { codeKey: "historypage.masterPrograms.code3", programKey: "historypage.masterPrograms.program3", detailsKey: "historypage.masterPrograms.details3" },
      { codeKey: "historypage.masterPrograms.code4", programKey: "historypage.masterPrograms.program4", detailsKey: "historypage.masterPrograms.details4" },
      { codeKey: "historypage.masterPrograms.code5", programKey: "historypage.masterPrograms.program5", detailsKey: "historypage.masterPrograms.details5" },
    ]
      .map((item) => ({
        ...item,
        code: t(item.codeKey),
        program: t(item.programKey),
        details: t(item.detailsKey),
      }))
      .filter((item) =>
        item.code !== item.codeKey &&
        item.program !== item.programKey &&
        item.details !== item.detailsKey
      )
      .sort((a, b) => a.program.localeCompare(b.program));

    setMasterPrograms(masterRaw);

    const postgraduateRaw = Array.from({ length: 9 }, (_, i) => {
      const codeKey = `historypage.postgraduateSpecialties.code${i + 1}`;
      const specialtyKey = `historypage.postgraduateSpecialties.specialty${i + 1}`;
      const code = t(codeKey);
      const specialty = t(specialtyKey);
      return { codeKey, specialtyKey, code, specialty };
    })
      .filter((item) => item.code !== item.codeKey && item.specialty !== item.specialtyKey)
      .sort((a, b) => a.specialty.localeCompare(b.specialty));

    setPostgraduateSpecialties(postgraduateRaw);

    const additionalRaw = Array.from({ length: 13 }, (_, i) => {
      const key = `historypage.additionalCourses.course${i + 1}`;
      const course = t(key);
      return { key, course };
    })
      .filter((item) => item.course !== item.key)
      .sort((a, b) => a.course.localeCompare(b.course));

    setAdditionalCourses(additionalRaw);

    const structureRaw = Array.from({ length: 29 }, (_, i) => {
      const key = `historypage.structureItems.title${i + 1}`;
      const title = t(key);
      return { key, title };
    })
      .filter((item) => item.title !== item.key)
      .sort((a, b) => a.title.localeCompare(b.title));

    setStructureItems(structureRaw);
  }, [i18n.language]);

  if (!i18n.isInitialized) return null;

  return (
    <Container maxWidth="lg" className="py-10 px-4">
    <Typography
      variant="h4"
      className="font-bold text-center mb-8 text-gray-800"
      style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
    >
      {t("historypage.InternationalUniversity")}
    </Typography>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.history")}
      </Typography>
      <Typography variant="body1" className="text-gray-600 text-justify">
        {t("historypage.content")}
      </Typography>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.adress")}
      </Typography>
      <Typography variant="body1" className="text-gray-600 text-justify">
        {t("historypage.location")}
      </Typography>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.Educational")}
      </Typography>
      <Typography variant="body1" className="text-gray-600 text-justify">
        {t("historypage.content2")}
      </Typography>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.bachelor")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.code")}
              </TableCell>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.programma")}
              </TableCell>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.profil")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bachelorPrograms.map((program, index) => (
              <TableRow key={index}>
                <TableCell className="text-justify">{program.code}</TableCell>
                <TableCell className="text-justify">
                  {program.program}
                </TableCell>
                <TableCell className="text-justify">
                  {program.profile}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.master")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.code")}
              </TableCell>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.programma")}
              </TableCell>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.programms")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {masterPrograms.map((program, index) => (
              <TableRow key={index}>
                <TableCell className="text-justify">{program.code}</TableCell>
                <TableCell className="text-justify">
                  {program.program}
                </TableCell>
                <TableCell className="text-justify">
                  {program.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.doctoral")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.code")}
              </TableCell>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.specialty")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postgraduateSpecialties.map((specialty, index) => (
              <TableRow key={index}>
                <TableCell className="text-justify">
                  {specialty.code}
                </TableCell>
                <TableCell className="text-justify">
                  {specialty.specialty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.continuing")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-gray-700">
                {t("historypage.course")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalCourses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-6">
        {t("historypage.structure")}
      </Typography>
      <Grid container spacing={3}>
        {structureItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="h-full display-flex flex-direction-column">
              <CardContent className="flex-grow-1">
                <Typography
                  variant="h6"
                  className="font-medium text-gray-700 mb-2 "
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>

    <section className="mb-10">
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.funding")}
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        {t("historypage.title")}
      </Typography>
    </section>
    <section>
      <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
        {t("historypage.contact")}
      </Typography>
      <Typography variant="body1" className="text-gray-600 text-justify">
        {t("historypage.location2")}
      </Typography>
    </section>
  </Container>
  );
};
