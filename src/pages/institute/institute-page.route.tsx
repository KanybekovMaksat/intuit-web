import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const InstitutePage = lazy(() => import('./institute-page.ui').then((m) => ({ default: m.InstitutePage })));

export const institutePageRoute: RouteObject = {
  path: 'institutes/:slug/',
  element: createElement(InstitutePage),
};
