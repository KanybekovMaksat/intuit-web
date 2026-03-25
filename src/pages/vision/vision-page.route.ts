import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { VisionPage } from './vision-page.ui';

export const visionPageRoute: RouteObject = {
  path: `vision/`,
  element: createElement(VisionPage),
};
