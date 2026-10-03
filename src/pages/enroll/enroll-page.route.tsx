import { RouteObject } from 'react-router-dom';
import { createElement, lazy } from 'react';
import { pathKeys } from '~shared/lib/react-router';

const EnrollPage = lazy(() => import('./enroll-page.ui').then((m) => ({ default: m.EnrollPage })));

export const enrollPageRoute: RouteObject = {
  path: pathKeys.enroll.root(),
  element: createElement(EnrollPage),
};
