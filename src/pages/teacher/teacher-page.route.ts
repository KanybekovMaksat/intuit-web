import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { TeacherPage } from './teacher-page.ui'
import { TeacherCv } from './teacher-cv/teacher-cv'

export const teacherPageRoute: RouteObject = {
  path: `teachers/:slug`,
  element: createElement(TeacherPage),
}
export const teacherPageCvRoute: RouteObject = {
  path: `teachers/:slug/cv`,
  element: createElement(TeacherCv),
}
