import { Container } from "@mui/material";
import { ScheduleKite } from "~widgets/schedule";

export const timeTablePage = () => {
  return (
    <Container maxWidth="lg" className="py-10 px-4">
      <ScheduleKite />
    </Container>
  );
};
