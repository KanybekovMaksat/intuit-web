import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ApplicantsPage = lazy(() => import('./applicants-page.ui').then((m) => ({ default: m.ApplicantsPage })));

export const applicantsPageRoute: RouteObject = {
  path: `applicants/`,
  element: createElement(ApplicantsPage),
};
