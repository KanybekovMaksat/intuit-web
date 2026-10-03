import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AdmissionsPage = lazy(() => import('./admissions-page.ui').then((m) => ({ default: m.AdmissionsPage })));

export const admissionsPageRoute: RouteObject = {
  path: `admissions/`,
  element: createElement(AdmissionsPage),
};
