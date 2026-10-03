import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const WindowPage = lazy(() => import('./window-page.ui').then((m) => ({ default: m.WindowPage })));

export const windowPageRoute: RouteObject = {
  path: `window/`,
  element: createElement(WindowPage),
};
