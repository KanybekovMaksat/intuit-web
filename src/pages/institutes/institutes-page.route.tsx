import { RouteObject } from 'react-router-dom';
import { createElement, lazy } from 'react';
import { pathKeys } from '~shared/lib/react-router';

const InstitutesPage = lazy(() => import('./institutes-page.ui').then((m) => ({ default: m.InstitutesPage })));

export const institutesPageRoute: RouteObject = {
  path: pathKeys.faculties.root(),
  element: createElement(InstitutesPage),
};
