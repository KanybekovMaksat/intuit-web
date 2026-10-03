import { createElement, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DocumentsPage = lazy(() => import('./documents-page.ui').then((m) => ({ default: m.DocumentsPage })));

export const documentsPageRoute: RouteObject = {
  path: `documents/`,
  element: createElement(DocumentsPage),
};
