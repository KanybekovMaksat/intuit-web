
import { useAuthLogic } from "../model/hooks/useAuthLogic";
import { getCookie } from "typescript-cookie";
import { Reveal } from "~shared/lib/framer";
import { Label } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


export const AuthForm = () => {
    const navigate = useNavigate();

 const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
        navigate("/tanda/result");
    },
    [navigate]
  );

  const isAuth = !!getCookie("access");

  return (
    <Reveal from="bottom" delay={0.3}>
      <div className="p-5 pb-20">
        <div className="bg-[#F7F7F7] rounded-[32px] shadow-2xl max-w-[568px] p-12 max-[475px]:p-5 mx-auto mt-24 md:mt-12 max-sm:mt-10 max-xs:mt-2">
          <form  className="text-center space-y-4">
            <h3 className="text-[28px] text-[#2C2C2C] leading-[32px] font-semibold">
              Подобрали подходящие <br /> для вас профессии
            </h3>
            <p className=" text-[#888888] text-base my-[12px] font-medium">
              Заполните форму, чтобы узнать результаты
            </p>
{/* 
            <div className="space-y-2 text-left">
              <Label htmlFor="name" className="text-[#000]">
                Ваше Имя
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                className={`w-full ${nameError ? "border-red" : ""}`}
                placeholder="Введите ваше имя"
              />
              {nameError && (
                <p className="text-red text-sm">
                  Имя должно быть не менее 3 символов
                </p>
              )}
            </div> */}

            <div className="space-y-2 text-left">
              {/* <Label htmlFor="phone" className="text-[#000]">
                Номер телефона
              </Label>
              <MuiTelInput
                value={phone}
                onChange={handlePhoneChange}
                defaultCountry="KG"
                onBlur={() => handleBlur("phone")}
                placeholder="Введите номер телефона"
                error={phoneError}
                helperText={phoneError && "Неверный формат номера"}
                className="w-full"
                inputProps={{
                  className: "h-5",
                }}
                sx={{
                  color: " #7874a9",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",

                    height: "35px",

                    "& fieldset": {
                      borderColor: phoneError ? "#ef4444" : "#e2e8f0",
                      color: " #7874a9",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e2e8f0",
                      color: " #7874a9",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                }}
              /> */}
            </div>

            <Button
              type="submit"
          onClick={handleSubmit}
              className="mt-8 py-3 px-12  text-white   text-sm md:text-base"
            >
              Перейти к результатам
            </Button>
          </form>
        </div>
      </div>
    </Reveal>
  );
};
