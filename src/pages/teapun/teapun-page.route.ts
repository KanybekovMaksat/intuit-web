import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const TeapunPage = lazy(() => import('./teapun-page.ui').then((m) => ({ default: m.TeapunPage })));

export const teapunPageRoute: RouteObject = {
  path: `cssteapun/`,
  element: createElement(TeapunPage),
};
