import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/06.svg";
import { Reveal } from "~shared/lib/framer";
import { CircleHelp, Timer } from "lucide-react";

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-[0] pr-5 pb-5 pl-5 ">
      <Reveal from="top" delay={0.3}>
        <img src={HomeImg} alt="Header" className="mx-auto h-[200px]" />
      </Reveal>
      <Reveal from="bottom" delay={0.3}>
        <h1 className="text-[32px] text-green  font-bold leading-[100%] mt-6 max-md:text-[32px] max-sm:text-[26px]">
          Узнайте, какая профессия <br /> вам подходит
        </h1>
        <p className="leading-[95%] text-[18px] text-[#888888]  mt-5 max-sm:text-base">
          Получите подробный отчёт от профориентологов <br /> и найдите дело по
          душе
        </p>
      </Reveal>

      <div className="flex justify-center items-center gap-[30px] flex-wrap my-6">
        <Reveal from="left" delay={0.3}>
          <div className="flex items-center gap-1 bg-[#E0E0E0]  rounded-full px-4 py-2 text-[16px] font-medium text-[#888888]">
          <CircleHelp />
            14 вопросов
          </div>
        </Reveal>
        <Reveal from="right" delay={0.3}>
          <div className="flex items-center gap-1 bg-[#E0E0E0] rounded-full px-4 py-2 text-[16px] font-medium text-[#888888]">
          <Timer />
            ~2 минуты
          </div>
        </Reveal>
      </div>
      <Reveal from="bottom" delay={0.3}>
        <Button
          onClick={() => navigate("/tanda/test")}
          variant="contained"
          className="bg-green shadow-none px-10"
        >
          Пройти тест
        </Button>
      </Reveal>
    </div>
  );
};
