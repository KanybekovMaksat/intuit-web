import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HistoryPage = lazy(() => import('./history-page.ui').then((m) => ({ default: m.HistoryPage })));

export const historyPageRoute: RouteObject = {
  path: `history/`,
  element: createElement(HistoryPage),
};
