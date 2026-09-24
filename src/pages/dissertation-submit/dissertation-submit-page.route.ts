import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { DissertationSubmitPage } from './dissertation-submit-page.ui'

export const dissertationSubmitPageRoute: RouteObject = {
  path: 'phd/submit/',
  element: createElement(DissertationSubmitPage),
}

export const dissertationEditPageRoute: RouteObject = {
  path: 'phd/submit/:id/',
  element: createElement(DissertationSubmitPage),
}
