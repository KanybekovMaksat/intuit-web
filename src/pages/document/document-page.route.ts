import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const DocumentPage = lazy(() => import('./document-page.ui').then((m) => ({ default: m.DocumentPage })));

export const documentPageRoute: RouteObject = {
  path: 'document/:slug/',
  element: createElement(DocumentPage),
}
