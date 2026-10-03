import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";

const timeTablePage = lazy(() => import('./students-page.ui').then((m) => ({ default: m.timeTablePage })));

export const timeTablePageRoute: RouteObject = {
  path: pathKeys.schedule.timeTable(),
  element: createElement(timeTablePage),
};
