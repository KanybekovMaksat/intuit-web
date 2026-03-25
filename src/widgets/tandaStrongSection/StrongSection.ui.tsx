import React from "react";
import { ResultChartProps } from "~features/tandaResults";
import { Typography } from "@mui/material";
import { ProgramCategory } from "~widgets/programm-category";

export const StrongSection: React.FC<ResultChartProps> = ({ results }) => {
  return (
    <div>
      <div className="relative container ">
        <Typography
          variant="h2"
          className="my-[20px] text-[#2C2C2C] text-[2.2rem] font-semibold text-center"
        >
          Подходящие профессии
        </Typography>
      <ProgramCategory/>
      </div>
    </div>
  );
};
