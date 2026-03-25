import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { DegreePage } from './degree-page.ui'

export const degreePageRoute: RouteObject = {
  path: 'degree/:slug/',
  element: createElement(DegreePage),
}
