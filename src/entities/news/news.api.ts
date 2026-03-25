import apiClient from '~shared/lib/api/apiClient'
import { FacultySchema } from './news.types'

export function getNews() {
  return apiClient.get('news/posts/')
}
export function getNewsInstitutes(id: number | null, category: number | null) {
  if (id) {
    return apiClient.get(`news/posts/?faculty=${id}`)
  } else {
    return apiClient.get(`news/posts/?categories=${category}`)
  }
}
export function getNewsDetail(slug: string) {
  return apiClient.get<FacultySchema>(`news/posts/${slug}/`)
}
