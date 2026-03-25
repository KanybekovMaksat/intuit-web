import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { PaymentsPage } from './payments-page.ui';
import { pathKeys } from '~shared/lib/react-router';

export const paymentsPageRoute: RouteObject = {
  path: pathKeys.enroll.payments(),
  element: createElement(PaymentsPage),
};
