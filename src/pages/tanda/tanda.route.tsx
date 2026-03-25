import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import TandaPage from "./tanda.ui";
import { createElement } from "react";

export const tandaPageRoute: RouteObject = {
  path: pathKeys.tanda(),
  element: createElement(TandaPage),
};
