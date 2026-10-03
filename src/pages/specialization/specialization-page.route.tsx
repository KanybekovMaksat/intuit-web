import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const SpecializationPage = lazy(() => import('./specialization-page.ui').then((m) => ({ default: m.SpecializationPage })));

export const specializationPageRoute: RouteObject = {
  path: '/specialization/:slug/',
  element: createElement(SpecializationPage),
};
