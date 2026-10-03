import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const ExpoPage = lazy(() => import('./expo-page.ui').then((m) => ({ default: m.ExpoPage })));

export const expoPageRoute: RouteObject = {
  path: 'expo',
  element: createElement(ExpoPage),
}
