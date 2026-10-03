import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { createElement, lazy } from "react";

const TandaLogin = lazy(() => import('./tandaLogin.ui').then((m) => ({ default: m.TandaLogin })));

export const LoginPageRoute: RouteObject = {
  path: pathKeys.tandaLogin(),
  element: createElement(TandaLogin),
};
