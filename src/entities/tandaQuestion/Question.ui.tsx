import { useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  LinearProgress,
  Radio,
  Typography,
} from "@mui/material";
import { Question as QuestionType } from "~entities/tandaQuestion";
import { Reveal } from "~shared/lib/framer";

function Progress(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            backgroundColor: "#00956f54",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#00956F",
            },
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface QuestionProps {
  question: QuestionType;
  selectedOption: string;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestion: number;
}

export const QuestionCard: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onOptionChange,
  onNextQuestion,
  onPreviousQuestion,
  currentQuestionIndex,
  totalQuestion,
}) => {
  const progressValue = ((currentQuestionIndex + 1) / totalQuestion) * 100;
  useEffect(() => {
    if (selectedOption) {
      const timer = setTimeout(() => {
        onNextQuestion();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, onNextQuestion]);
  const handleOptionClick = (optionValue: string) => {
    const event = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onOptionChange(event);
  };

  return (
    <div className="max-w-[968px]  pt-[30px] px-[20px]   min-h-[100vh]  ">
      <Reveal from="bottom" delay={0.3}>
        <div className="flex h-[70px] items-center gap-x-[10px] justify-center ">
          <span className="text-[#7b7b7b] font-semibold text-[15px]">
            {`${currentQuestionIndex + 1}/${totalQuestion}`}
          </span>
          <Progress value={progressValue} className="h-2 w-[300px]" />
        </div>
      </Reveal>

      <div className="bg-white pt-[24px] pr-[48px] pl-[63px] rounded-[30px] max-md:pr-[20px] max-md:pl-[43px] min-h-[650px] max-h-[650px] min-w-[550px] max-w-[550px]">
        <Reveal from="top" delay={0.3}>
          <h2 className="text-[24px] h-[55px] font-medium max-w-[500px] md:max-w-[350px] leading-[100%] ">
            {question.question}
          </h2>
        </Reveal>

        <ul>
          {question.options.map((option) => (
            <Reveal key={option.value} from="left" delay={0.3}>
              {" "}
              <li
                className="max-w-[870px] mb-3 rounded-md p-3 border leading-[100%] border-green hover:bg-green/20 transition-colors duration-150 ease-in-out  cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedOption === option.value}
                      onChange={onOptionChange}
                      value={option.value}
                      sx={{
                        color: "#00956F",
                        "&.Mui-checked": {
                          color: "#00956F",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      className="text-tandaColor font-normal leading-[98%] text-[1rem]"
                    >
                      {option.text}
                    </Typography>
                  }
                />
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal from="bottom" delay={0.3}>
          <div className="mt-[37px] flex items-center ">
            <Button
              onClick={onPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="contained"
              className="m-auto text-white font-medium  bg-green text-[16px]   transition-colors duration-150 ease-in-out"
            >
              Назад
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
