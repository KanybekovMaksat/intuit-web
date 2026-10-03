import React, { useState } from "react";
import { Reveal } from "~shared/lib/framer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("quizUser", JSON.stringify({ name, phone }));
    }
    navigate("/tanda/result");
  };

  return (
    <Reveal from="bottom" delay={0.2}>
      <div className="p-5 pb-20">
        <div className="bg-[#F7F7F7] rounded-[32px] shadow-2xl max-w-[568px] p-12 max-[475px]:p-6 mx-auto mt-24 md:mt-12 max-sm:mt-10">
          <form onSubmit={handleSubmit} className="text-center space-y-5">
            <h3 className="text-[28px] text-[#2C2C2C] leading-[34px] font-semibold">
              Подобрали подходящие <br /> для вас профессии
            </h3>
            <p className="text-[#888888] text-sm my-2 font-medium">
              Укажите имя и телефон для сохранения результатов тестирования
            </p>

            <div className="space-y-4 text-left">
              <div>
                <label htmlFor="auth-name" className="block text-xs font-semibold text-gray-700 mb-1">
                  Ваше имя
                </label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#00956F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Номер телефона
                </label>
                <PhoneInput
                  country={"kg"}
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  inputStyle={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "8px",
                    paddingLeft: "48px",
                    fontSize: "14px",
                  }}
                  containerStyle={{ width: "100%" }}
                  inputClass="outline-none"
                  buttonStyle={{ border: "none", background: "transparent" }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              className="!mt-8 !py-3 !px-10 !bg-[#00956F] hover:!bg-[#007f5e] !text-white !font-bold !rounded-lg !capitalize !text-sm md:!text-base"
            >
              Перейти к результатам
            </Button>
          </form>
        </div>
      </div>
    </Reveal>
  );
};
