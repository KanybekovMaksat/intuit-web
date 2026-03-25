import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { NewsPage } from './news-page.ui'

export const newsPageRoute: RouteObject = {
  path: 'news/:slug',
  element: createElement(NewsPage),
}
