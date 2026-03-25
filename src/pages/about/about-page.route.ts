import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { AboutPage } from './about-page.ui';

export const aboutPageRoute: RouteObject = {
  path: `about/`,
  element: createElement(AboutPage),
};
