import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { t } from "i18next";
import { useState } from "react";

export const PaymentsPage = () => {
  const [category, setCategory] = useState("МУИТ");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const categories = [
    { value: "МУИТ", label: t("paymentsPage.MUIT") },
    { value: "КОМТЕХНО И КИТЭ", label: t("paymentsPage.KOMTEKHNO_KITE") },
    { value: "КР", label: t("paymentsPage.KR") },
  ];
  

  const tableData = {
    МУИТ: [
      {
        code: "71200",
        program: "Program A",
        duration: "4 years",
        fee: "10000",
      },
      // add more data as needed
    ],
    "КОМТЕХНО И КИТЭ": [
      { code: "71201", program: "Program B", duration: "3 years", fee: "9000" },
      // add more data as needed
    ],
    КР: [
      { code: "71202", program: "Program C", duration: "2 years", fee: "8000" },
      // add more data as needed
    ],
  };

  return (
    <div>
      <Select value={category} onChange={handleCategoryChange}>
        {categories.map((cat) => (
          <MenuItem key={cat.value} value={cat.value}>
            {cat.label}
          </MenuItem>
        ))}
      </Select>

      <TableContainer component={Paper} className="my-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("paymentsPage.code")}</TableCell>
              <TableCell>{t("paymentsPage.direction")}</TableCell>
              <TableCell>{t("paymentsPage.studyDuration")}</TableCell>
              <TableCell>{t("paymentsPage.studyCost")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData[category].map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.program}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
