import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HeadPage = lazy(() => import('./head-page.ui').then((m) => ({ default: m.HeadPage })));

export const headPageRoute: RouteObject = {
  path: `head/`,
  element: createElement(HeadPage),
};
