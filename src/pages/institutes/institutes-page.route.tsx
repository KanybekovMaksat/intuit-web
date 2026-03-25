import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';
import { InstitutesPage } from './institutes-page.ui';

export const institutesPageRoute: RouteObject = {
  path: pathKeys.faculties.root(),
  element: createElement(InstitutesPage),
};
