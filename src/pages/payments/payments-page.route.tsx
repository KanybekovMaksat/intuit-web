import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const PaymentsPage = lazy(() => import('./payments-page.ui').then((m) => ({ default: m.PaymentsPage })));

export const paymentsPageRoute: RouteObject = {
  path: pathKeys.enroll.payments(),
  element: createElement(PaymentsPage),
};
