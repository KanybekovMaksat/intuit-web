import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { createElement, lazy } from "react";

const TestPage = lazy(() => import('./tandaTest.ui'));

export const TestPageRoute: RouteObject = {
  path: pathKeys.tandaTest(),
  element: createElement(TestPage),
};
