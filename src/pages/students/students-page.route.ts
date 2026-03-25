import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { StudentsPage } from "./students-page.ui";
import { pathKeys } from "~shared/lib/react-router";

export const studentsPageRoute: RouteObject = {
  path: pathKeys.schedule.root(),
  element: createElement(StudentsPage),
};
