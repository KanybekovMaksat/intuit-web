import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const EventPage = lazy(() => import('./event-page.ui').then((m) => ({ default: m.EventPage })));

export const eventPageRoute: RouteObject = {
  path: 'news/event/:slug',
  element: createElement(EventPage),
}
