import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { InstitutePage } from './institute-page.ui';

export const institutePageRoute: RouteObject = {
  path: 'institutes/:slug/',
  element: createElement(InstitutePage),
};
