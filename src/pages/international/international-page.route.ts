import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { pathKeys } from '~shared/lib/react-router'
import { InternationalPage } from './international-page.ui'

export const internationalPageRoute: RouteObject = {
  path: pathKeys.international.root(),
  element: createElement(InternationalPage),
}
