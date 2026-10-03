import { RouteObject } from 'react-router-dom'
import { createElement, lazy } from 'react'

const DissertationSubmitPage = lazy(() => import('./dissertation-submit-page.ui').then((m) => ({ default: m.DissertationSubmitPage })));

export const dissertationSubmitPageRoute: RouteObject = {
  path: 'phd/submit/',
  element: createElement(DissertationSubmitPage),
}

export const dissertationEditPageRoute: RouteObject = {
  path: 'phd/submit/:id/',
  element: createElement(DissertationSubmitPage),
}
