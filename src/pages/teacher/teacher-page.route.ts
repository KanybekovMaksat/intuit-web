import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const TeacherPage = lazy(() => import('./teacher-page.ui').then((m) => ({ default: m.TeacherPage })));
const TeacherCv = lazy(() => import('./teacher-cv/teacher-cv').then((m) => ({ default: m.TeacherCv })));

export const teacherPageRoute: RouteObject = {
  path: `teachers/:slug`,
  element: createElement(TeacherPage),
}
export const teacherPageCvRoute: RouteObject = {
  path: `teachers/:slug/cv`,
  element: createElement(TeacherCv),
}
