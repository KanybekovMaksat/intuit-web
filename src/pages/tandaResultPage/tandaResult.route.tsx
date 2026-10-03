import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { createElement, lazy } from "react";

const TandaResult = lazy(() => import('./tandaResult.ui').then((m) => ({ default: m.TandaResult })));

export const ResultPageRoute: RouteObject = {
  path: pathKeys.tandaResult(),
  element: createElement(TandaResult),
};
