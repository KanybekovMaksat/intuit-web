import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

type GroupItem = {
  id: number;
  name: string;
};

type ScheduleItem = {
  id: number;
  subject: { name: string };
  teacher?: { fullName: string }; // Сделал необязательным
  room: { number: string; building: string };
  lessonTime: { startTime: string; endTime: string };
  lessonType: { name: string };
  dayOfWeek: number;
  weekType: string;
  groups?: GroupItem[]; // Сделал необязательным и исправил тип
};

type Props = {
  schedule: ScheduleItem[];
};

export const ScheduleDetailLesson: React.FC<Props> = ({ schedule }) => {
  const getWeekTypeLabel = (type: string): string => {
    switch (type) {
      case "top":
        return "Числитель";
      case "bottom":
        return "Знаменатель";
      case "weekly":
        return "";
      default:
        return "—";
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 🟢 Перемещено выше

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          {schedule.map(
            (
              {
                id,
                subject,
                lessonTime,
                room,
                weekType,
                lessonType,
                teacher,
                groups,
              },
              index
            ) => (
              <div key={id} className="flex">
                <div className="bg-sun w-5 rounded-s-sm flex items-center justify-center">
                  {weekType?.trim() !== "" &&
                    getWeekTypeLabel(weekType)?.trim() !== "" && (
                      <span className="text-white block -rotate-90 origin-center whitespace-nowrap">
                        {getWeekTypeLabel(weekType)}
                      </span>
                    )}
                </div>
                <div className="bg-[#F4F4F5] p-3 rounded w-full" key={id}>
                  <div className="flex justify-between mb-4">
                    <span className="py-2 px-4 bg-primary text-white rounded-lg font-semibold">
                      {index + 1}
                    </span>
                    <span className="px-4 py-2 bg-white rounded-lg">
                      {lessonTime.startTime}–{lessonTime.endTime}
                    </span>
                    <span className="px-4 py-2 bg-gray-100 rounded-lg bg-primary text-white">
                      {room.number}
                    </span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="text-2xl">{subject?.name || "—"}</span>
                    <span className="text-primary">
                      {lessonType?.name || "—"}
                    </span>
                  </div>
                  <div className="bg-primary h-[1px] mb-2"></div>
                  <span className="text-xl">{teacher?.fullName}</span>
                  {groups && (
                    <div className="flex flex-wrap gap-2">
                      {groups.map((group) => (
                        <span
                          className="bg-white p-2 rounded-[8px]"
                          key={group.id}
                        >
                          {group.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.map(
            (
              {
                id,
                subject,
                lessonTime,
                room,
                weekType,
                lessonType,
                teacher,
                groups,
              },
              index
            ) => (
              <div
                key={id}
                className="flex relative justify-between items-center p-3 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-x-4">
                  <span className="py-2 px-4 bg-[#2A2172] text-white rounded-lg font-semibold">
                    {index + 1}
                  </span>
                  <span className="px-4 py-2 bg-gray-100 rounded-lg bg-[#F4F4F5]">
                    {lessonTime.startTime}–{lessonTime.endTime}
                  </span>
                  <span className="absolute top-[-24px] right-0 px-4 py-2 bg-primary rounded-lg bg-sun text-white">
                    Кабинет: {room.number}
                  </span>
                  {weekType?.trim() !== "" &&
                    getWeekTypeLabel(weekType)?.trim() !== "" && (
                      <span className="px-4 py-2 bg-[#2A2172] text-white rounded-lg">
                        {getWeekTypeLabel(weekType)}
                      </span>
                    )}
                  <div className="flex flex-col">
                    <span className="text-[#2A2172]">
                      {subject?.name || "—"}
                    </span>
                    <span className="text-[#2A2172] font-bold">
                      {lessonType?.name || "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {teacher?.fullName && (
                    <span className="text-[#2A2172]">
                      {teacher?.fullName || "—"}
                    </span>
                  )}
                  {groups?.map((groupItem) => (
                    <div
                      className="px-4 py-2 bg-gray-100 rounded-lg bg-[#F4F4F5]"
                      key={groupItem.id}
                    >
                      {groupItem.name}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

ScheduleDetailLesson.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.shape({ name: PropTypes.string }).isRequired,
      teacher: PropTypes.shape({ fullName: PropTypes.string }),
      room: PropTypes.shape({
        number: PropTypes.string.isRequired,
        building: PropTypes.string.isRequired,
      }).isRequired,
      lessonTime: PropTypes.shape({
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
      }).isRequired,
      lessonType: PropTypes.shape({ name: PropTypes.string.isRequired })
        .isRequired,
      groups: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
