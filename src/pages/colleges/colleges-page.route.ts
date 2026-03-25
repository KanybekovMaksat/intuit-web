import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { CollegesPage } from './colleges-page.ui';

export const collegesPageRoute: RouteObject = {
  path: `colleges/`,
  element: createElement(CollegesPage),
};
