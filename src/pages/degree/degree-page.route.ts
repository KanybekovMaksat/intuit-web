import { RouteObject } from 'react-router-dom'
import { createElement, lazy } from 'react'

const DegreePage = lazy(() => import('./degree-page.ui').then((m) => ({ default: m.DegreePage })));

export const degreePageRoute: RouteObject = {
  path: 'degree/:slug/',
  element: createElement(DegreePage),
}
