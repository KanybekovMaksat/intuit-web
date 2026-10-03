import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";

const StudentsPage = lazy(() => import('./students-page.ui').then((m) => ({ default: m.StudentsPage })));

export const studentsPageRoute: RouteObject = {
  path: pathKeys.schedule.root(),
  element: createElement(StudentsPage),
};
