import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { DocumentPage } from './document-page.ui'

export const documentPageRoute: RouteObject = {
  path: 'document/:slug/',
  element: createElement(DocumentPage),
}
