import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { WindowPage } from './window-page.ui';

export const windowPageRoute: RouteObject = {
  path: `window/`,
  element: createElement(WindowPage),
};
