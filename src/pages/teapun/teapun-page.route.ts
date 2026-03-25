import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { TeapunPage } from './teapun-page.ui';

export const teapunPageRoute: RouteObject = {
  path: `cssteapun/`,
  element: createElement(TeapunPage),
};
