import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const EventsPage = lazy(() => import('./events-page.ui').then((m) => ({ default: m.EventsPage })))

export const eventsPageRoute: RouteObject = {
  path: 'events/',
  element: createElement(EventsPage),
}
