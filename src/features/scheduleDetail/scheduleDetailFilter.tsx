import { useEffect, useState } from "react";

type Props = {
  currentDay: number | null;
  onDayChange: (day: number | null) => void;
  currentWeekType: "top" | "bottom" | null;
  onWeekTypeChange: (type: "top" | "bottom" | null) => void;
};

export const ScheduleDetailFilter: React.FC<Props> = ({
  currentDay,
  onDayChange,
  currentWeekType,
  onWeekTypeChange,
}) => {
  const fullWeekDays = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
  ];

  const shortWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт"];

  const [weekDays, setWeekDays] = useState(
    window.innerWidth <= 768 ? shortWeekDays : fullWeekDays
  );

  useEffect(() => {
    const handleResize = () => {
      setWeekDays(window.innerWidth <= 1180 ? shortWeekDays : fullWeekDays);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex lg:flex-col items-center justify-between r-md:flex-col mb-9 r-md:mb-4">
      {/* дни недели */}
      <div className="flex lg:mb-5 items-center gap-2">
        {weekDays.map((label, index) => (
          <button
            key={label}
            onClick={() => onDayChange(currentDay === index ? null : index)}
            className={`py-2.5 px-4 sm:text-sm border sm:border-none rounded-xl transition-colors
                ${
                  currentDay === index
                    ? "border-primary bg-primary text-white"
                    : "bg-white text-[#52525B]"
                }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* тип недели */}
      <div className="inline-block p-1 rounded-xl bg-[#F4F4F5]">
        {(["top", "bottom"] as const).map((type) => (
          <button
            key={type}
            onClick={() =>
              onWeekTypeChange(currentWeekType === type ? null : type)
            }
            className={`py-1.5 px-6 rounded-lg transition-colors
                ${
                  currentWeekType === type
                    ? "bg-white shadow text-primary"
                    : "text-[#52525B]"
                }`}
          >
            {type === "top" ? "Числитель" : "Знаменатель"}
          </button>
        ))}
      </div>
    </div>
  );
};
