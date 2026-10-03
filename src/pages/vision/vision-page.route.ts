import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const VisionPage = lazy(() => import('./vision-page.ui').then((m) => ({ default: m.VisionPage })));

export const visionPageRoute: RouteObject = {
  path: `vision/`,
  element: createElement(VisionPage),
};
