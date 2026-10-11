import apiClient from '~shared/lib/api/apiClient'
import { FacultySchema } from './news.types'

export function getNews() {
  return apiClient.get('news/posts/')
}
export type NewsListItem = {
  id: number
  slug: string
  title: string
  date: string
  banner: string
  categories: { id: number; slug: string; title: string }[]
}

/** One server page (30 posts), optionally limited to a category. */
export function getNewsPage(page: number, categoryId?: number | null) {
  const params: Record<string, number> = { page }
  if (categoryId) params.categories = categoryId
  return apiClient.get('news/posts/', { params })
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
