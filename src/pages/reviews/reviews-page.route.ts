import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const ReviewsPage = lazy(() => import('./reviews-page.ui').then((m) => ({ default: m.ReviewsPage })))

export const reviewsPageRoute: RouteObject = {
  path: 'reviews/',
  element: createElement(ReviewsPage),
}
