import { RouteObject } from 'react-router-dom'
import { createElement, lazy } from 'react'
import { pathKeys } from '~shared/lib/react-router'

const InternationalPage = lazy(() => import('./international-page.ui').then((m) => ({ default: m.InternationalPage })));

export const internationalPageRoute: RouteObject = {
  path: pathKeys.international.root(),
  element: createElement(InternationalPage),
}
