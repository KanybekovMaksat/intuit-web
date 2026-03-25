import { CalendarMonth, Person } from "@mui/icons-material";
import {
  Typography,
  Container,
  Tabs,
  Tab,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import { t } from "i18next";
import { ChevronRight, School, SearchIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { schedulesQueries } from "~entities/schedules";
import {
  EducationLevel,
  Course,
  Group,
  Teacher,
} from "~entities/schedules/schedules.types";
import { pathKeys } from "~shared/lib/react-router";

export const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabLvl, setActiveTabLvl] = useState("Бакалавриат");

  const { data: groupsData = [] } = schedulesQueries.useGetGroups(1);
  const { data: teachersData = [] } = schedulesQueries.useGetTeachers(1);
  const { data: eduLvlData } = schedulesQueries.useGetEduLvl();
  const { data: coursesData } = schedulesQueries.useGetCourses(1);

  // Выбранный уровень образования
  const selectedEducationLevel = useMemo(() => {
    return eduLvlData?.find(
      (level: EducationLevel) => level.name === activeTabLvl
    );
  }, [eduLvlData, activeTabLvl]);

  // Курсы, относящиеся к выбранному уровню образования
  const relevantCourses = useMemo(() => {
    if (!coursesData || !selectedEducationLevel) return [];
    return coursesData.filter(
      (course: Course) => course.educationLevel === selectedEducationLevel.id
    );
  }, [coursesData, selectedEducationLevel]);

  // Устанавливаем первый курс при изменении уровня
  useEffect(() => {
    if (relevantCourses.length > 0) {
      setSelectedCourseId(relevantCourses[0].id);
    } else {
      setSelectedCourseId(null);
    }
  }, [relevantCourses]);

  // Группы, отфильтрованные по ID выбранного курса
  const filteredGroups = useMemo(() => {
    if (!groupsData || selectedCourseId === null) return [];
    return groupsData
      .filter(
        (group: Group) =>
          group.course?.id === selectedCourseId &&
          group.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a: Group, b: Group) => (a.name || "").localeCompare(b.name || ""));
  }, [groupsData, selectedCourseId, searchQuery]);

  // Преподаватели
  const filteredTeachers = useMemo(() => {
    if (!teachersData) return [];
    return teachersData
      .filter((teacher: Teacher) => {
        const teacherName = teacher.fullName || "";
        return teacherName.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a: Teacher, b: Teacher) =>
        (a.fullName || "").localeCompare(b.fullName || "")
      );
  }, [teachersData, searchQuery]);

  const handleEduLevelChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTabLvl(newValue);
  };

  return (
    <Container maxWidth="lg" className="p-0 ">
      <div className="flex mb-14 flex-wrap justify-center gap-12 r-md:gap-8 r-md:flex-col r-md:justify-center">
        {/* Левая колонка */}
        <div className="w-[460px] sm:w-full">
          <div className="flex items-center justify-between mb-8 r-md:mb-4">
            <div className="flex items-center gap-3">
              <CalendarMonth className="text-indigo-600" fontSize="large" />
              <Typography
                variant="h4"
                className="font-semibold text-gray-800 r-md:text-2xl"
              >
                {t("studentsPage.schedule")}
              </Typography>
            </div>
          </div>

          <Paper className="rounded-xl shadow border border-gray-100 overflow-hidden">
            {/* Уровень образования */}
            <Tabs
              value={activeTabLvl}
              onChange={handleEduLevelChange}
              className="text-[#2A2172]"
              TabIndicatorProps={{ style: { backgroundColor: "#2A2172" } }}
              variant="scrollable"
            >
              {eduLvlData?.map((tab: EducationLevel) => (
                <Tab
                  key={tab.id}
                  className="text-black"
                  label={tab.name}
                  value={tab.name}
                />
              ))}
            </Tabs>

            {/* Студент / Преподаватель */}
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              className="border-b border-gray-200"
              TabIndicatorProps={{
                style: { backgroundColor: "#2A2172", height: "3px" },
              }}
            >
              <Tab
                icon={<School />}
                iconPosition="start"
                label="Студент"
                sx={{
                  "&.Mui-selected": { color: "#2A2172" },
                  "&:not(.Mui-selected)": { color: "#6B7280" },
                  textTransform: "none",
                }}
              />
              <Tab
                icon={<Person />}
                iconPosition="start"
                label="Преподаватель"
                sx={{
                  "&.Mui-selected": { color: "#2A2172" },
                  "&:not(.Mui-selected)": { color: "#6B7280" },
                  textTransform: "none",
                }}
              />
            </Tabs>

            <div className="p-4 md:p-6">
              {activeTab === 0 && (
                <>
                  {relevantCourses.length > 0 ? (
                    <Tabs
                      value={
                        selectedCourseId
                          ? relevantCourses.findIndex(
                              (c) => c.id === selectedCourseId
                            )
                          : 0
                      }
                      onChange={(_, idx) =>
                        setSelectedCourseId(relevantCourses[idx].id)
                      }
                      variant="scrollable"
                      className="border-b border-gray-200"
                      TabIndicatorProps={{
                        style: { backgroundColor: "#2A2172", height: "3px" },
                      }}
                    >
                      {relevantCourses.map((course: Course) => (
                        <Tab
                          key={course.id}
                          label={`${course.number} курс`}
                          sx={{
                            "&.Mui-selected": {
                              color: "white",
                              backgroundColor: "#2A2172",
                            },
                            "&:not(.Mui-selected)": { color: "#6B7280" },
                            textTransform: "none",
                          }}
                        />
                      ))}
                    </Tabs>
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      Нет курсов для выбранного уровня образования
                    </div>
                  )}

                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Поиск группы..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="text-gray-400" />
                        </InputAdornment>
                      ),
                      className: "bg-gray-50 rounded-lg",
                    }}
                    sx={{ mt: 3 }}
                  />
                </>
              )}

              {activeTab === 1 && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Поиск преподавателя..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className="text-gray-400" />
                      </InputAdornment>
                    ),
                    className: "bg-gray-50 rounded-lg",
                  }}
                />
              )}
            </div>
          </Paper>
        </div>

        {/* Правая колонка */}
        <div className="w-96 r-sm:w-full border p-6 rounded-xl shadow r-md:mx-auto">
          {activeTab === 0 ? (
            <>
              <h3 className="text-2xl font-semibold mb-6">Группы:</h3>
              <div
                className={`flex flex-col gap-1 space-y-4 w-full max-w-md ${
                  filteredGroups.length > 8
                    ? "max-h-96 overflow-y-auto pr-2"
                    : ""
                }`}
              >
                {filteredGroups.map((group) => (
                  <Link
                    to={pathKeys.schedule.bySlugGroup(group.id)}
                    key={group.id}
                  >
                    <Paper
                      elevation={0}
                      className="flex w-full items-center justify-between p-3 hover:bg-white transition-all cursor-pointer rounded-lg border border-gray-200"
                    >
                      <Typography className="font-medium">
                        {group.name}
                      </Typography>
                      <ChevronRight className="text-gray-400" />
                    </Paper>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-6">Преподаватели:</h3>
              <div
                className={`flex flex-col gap-1 space-y-4 w-full max-w-md ${
                  filteredTeachers.length > 8
                    ? "max-h-96 overflow-y-auto pr-2"
                    : ""
                }`}
              >
                {filteredTeachers.map((teacher) => (
                  <Link
                    to={pathKeys.schedule.bySlugTeacher(teacher.id)}
                    key={teacher.id}
                  >
                    <Paper
                      elevation={0}
                      className="flex w-full items-center justify-between p-3 hover:bg-white transition-all cursor-pointer rounded-lg border border-gray-200"
                    >
                      <Typography className="font-medium">
                        {teacher.fullName || "Неизвестный преподаватель"}
                      </Typography>
                      <ChevronRight className="text-gray-400" />
                    </Paper>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
