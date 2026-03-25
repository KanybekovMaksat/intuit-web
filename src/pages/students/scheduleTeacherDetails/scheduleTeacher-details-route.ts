import { createElement } from "react";
import { pathKeys } from "~shared/lib/react-router";
import { RouteObject } from "react-router-dom";
import { ScheduleTeacherDetailPage } from "./scheduleTeacher-details-page";

export const scheduleDetailTeacherRoute: RouteObject = {
  path: pathKeys.schedule.bySlugTeacher(":slug"),
  element: createElement(ScheduleTeacherDetailPage),
};
