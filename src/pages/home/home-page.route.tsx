import { RouteObject } from 'react-router-dom';
import { createElement, lazy } from 'react';
import { pathKeys } from '~shared/lib/react-router';

const HomePage = lazy(() => import('./home-page.ui').then((m) => ({ default: m.HomePage })));

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(HomePage),
};
