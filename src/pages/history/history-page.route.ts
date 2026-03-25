import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { HistoryPage } from './history-page.ui';

export const historyPageRoute: RouteObject = {
  path: `history/`,
  element: createElement(HistoryPage),
};
