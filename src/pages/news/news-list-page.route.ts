import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const NewsListPage = lazy(() =>
  import('./news-list-page.ui').then((m) => ({ default: m.NewsListPage }))
)

export const newsListPageRoute: RouteObject = {
  path: 'news/',
  element: createElement(NewsListPage),
}
