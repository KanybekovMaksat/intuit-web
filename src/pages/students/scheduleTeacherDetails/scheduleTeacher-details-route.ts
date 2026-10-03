import { createElement, lazy } from "react";
import { pathKeys } from "~shared/lib/react-router";
import { RouteObject } from "react-router-dom";

const ScheduleTeacherDetailPage = lazy(() => import('./scheduleTeacher-details-page').then((m) => ({ default: m.ScheduleTeacherDetailPage })));

export const scheduleDetailTeacherRoute: RouteObject = {
  path: pathKeys.schedule.bySlugTeacher(":slug"),
  element: createElement(ScheduleTeacherDetailPage),
};
