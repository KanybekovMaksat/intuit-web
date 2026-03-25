import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import TestPage from "./tandaTest.ui";
import { createElement } from "react";

export const TestPageRoute: RouteObject = {
  path: pathKeys.tandaTest(),
  element: createElement(TestPage),
};
