import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { timeTablePage } from "./students-page.ui";

export const timeTablePageRoute: RouteObject = {
  path: pathKeys.schedule.timeTable(),
  element: createElement(timeTablePage),
};
