import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { AdmissionsPage} from './admissions-page.ui';

export const admissionsPageRoute: RouteObject = {
  path: `admissions/`,
  element: createElement(AdmissionsPage),
};
