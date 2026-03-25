import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { SpecializationPage } from './specialization-page.ui';

export const specializationPageRoute: RouteObject = {
  path: '/specialization/:slug/',
  element: createElement(SpecializationPage),
};
