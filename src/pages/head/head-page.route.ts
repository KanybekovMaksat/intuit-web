import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { HeadPage} from './head-page.ui';

export const headPageRoute: RouteObject = {
  path: `head/`,
  element: createElement(HeadPage),
};
