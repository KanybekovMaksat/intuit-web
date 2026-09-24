import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { DissertationPage } from './dissertation-page.ui'

export const dissertationPageRoute: RouteObject = {
  path: 'phd/dissertations/:id/',
  element: createElement(DissertationPage),
}
