import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { createElement, lazy } from "react";

const TandaPage = lazy(() => import('./tanda.ui'));

export const tandaPageRoute: RouteObject = {
  path: pathKeys.tanda(),
  element: createElement(TandaPage),
};
