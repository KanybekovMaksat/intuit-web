import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { EventPage } from './event-page.ui'

export const eventPageRoute: RouteObject = {
  path: 'news/event/:slug',
  element: createElement(EventPage),
}
