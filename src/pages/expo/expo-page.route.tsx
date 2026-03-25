import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { ExpoPage } from './expo-page.ui'

export const expoPageRoute: RouteObject = {
  path: 'expo',
  element: createElement(ExpoPage),
}
