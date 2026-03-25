import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { ApplicantsPage } from './applicants-page.ui';

export const applicantsPageRoute: RouteObject = {
  path: `applicants/`,
  element: createElement(ApplicantsPage),
};
