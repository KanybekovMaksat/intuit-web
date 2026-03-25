import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { schedulesQueries } from "~entities/schedules";
import {
  ScheduleDetailFilter,
  ScheduleDetailLesson,
  ScheduleDetailTop,
} from "~features/scheduleDetail";

export const ScheduleDetailGroups = () => {
  const { slug } = useParams<{ slug: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ------------- фильтры -------------
  const getTodayIndex = () => {
    const today = new Date().getDay();
    // оставляем только рабочие дни (Пн–Пт), иначе null
    return today >= 1 && today <= 5 ? today - 1 : null;
  };
  const [day, setDay] = useState<number | null>(getTodayIndex());
  const [weekType, setWeekType] = useState<"top" | "bottom" | null>(null);
  // -----------------------------------

  if (!slug) return <Navigate to="/404" replace />;

  const { data, isError, isLoading } =
    schedulesQueries.useGetGroupsDetails(slug);

  if (isLoading) return <p>Загрузка…</p>;
  if (isError || !data) return <p>Ошибка загрузки расписания</p>;

  const { group, weekType: weekTypeNew, schedule } = data;

  /* фильтрация */
  const normalizeWeekType = (wt: unknown): string => {
    const s = String(wt ?? "")
      .trim()
      .toLowerCase();
    // если у вас на бэке другие значения — добавьте алиасы сюда
    if (s === "weekly" || s === "" || s === "еженедельно") return ""; // общий урок
    if (s === "top" || s === "числитель" || s === "numerator") return "top";
    if (s === "bottom" || s === "знаменатель" || s === "denominator")
      return "bottom";
    return s;
  };

  const filtered = schedule.filter((item) => {
    if (day !== null && item.dayOfWeek !== day) return false;

    if (weekType) {
      const itemWT = normalizeWeekType(item.weekType);
      if (itemWT && itemWT !== weekType) return false; // явно другой тип — отсекаем
    }

    return true;
  });

  return (
    <div>
      {!isMobile && (
        <ScheduleDetailTop
          weekType={weekTypeNew}
          name={group?.name ?? "Группа не указана"}
          curatorName={group?.curatorName ?? "Куратора нет!"}
        />
      )}

      <ScheduleDetailFilter
        currentDay={day}
        onDayChange={setDay}
        currentWeekType={weekType}
        onWeekTypeChange={setWeekType}
      />

      <ScheduleDetailLesson schedule={filtered} />

      {isMobile && (
        <div className="mt-10">
          <ScheduleDetailTop
            name={group?.name ?? "Группа не указана"}
            curatorName={group?.curatorName ?? "Куратора нет!"}
          />
        </div>
      )}
    </div>
  );
};
