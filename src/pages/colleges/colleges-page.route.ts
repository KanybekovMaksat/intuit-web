import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const CollegesPage = lazy(() => import('./colleges-page.ui').then((m) => ({ default: m.CollegesPage })));

export const collegesPageRoute: RouteObject = {
  path: `colleges/`,
  element: createElement(CollegesPage),
};
