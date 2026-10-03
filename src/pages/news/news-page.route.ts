import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const NewsPage = lazy(() => import('./news-page.ui').then((m) => ({ default: m.NewsPage })));

export const newsPageRoute: RouteObject = {
  path: 'news/:slug',
  element: createElement(NewsPage),
}
