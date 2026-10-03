import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AboutPage = lazy(() => import('./about-page.ui').then((m) => ({ default: m.AboutPage })));

export const aboutPageRoute: RouteObject = {
  path: `about/`,
  element: createElement(AboutPage),
};
