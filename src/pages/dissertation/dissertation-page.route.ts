import { RouteObject } from 'react-router-dom'
import { createElement, lazy } from 'react'

const DissertationPage = lazy(() => import('./dissertation-page.ui').then((m) => ({ default: m.DissertationPage })));

export const dissertationPageRoute: RouteObject = {
  path: 'phd/dissertations/:id/',
  element: createElement(DissertationPage),
}
