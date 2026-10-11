import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getNews, getNewsDetail, getNewsInstitutes, getNewsPage } from './news.api'

const keys = {
  root: () => ['news'],
  getNews: (slug: string) => [...keys.root(), slug] as const,
  getNewsInstitutes: (id: number) => [...keys.root(), id] as const,
}

export function useGetNews() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getNews,
  })
}
export function useGetNewsInstitutes(id: number | null, category: number | null) {
  return useQuery({
    queryKey: keys.getNewsInstitutes(id),
    queryFn: () => getNewsInstitutes(id, category),
  })
}

export function useGetNewsPage(page: number, categoryId?: number | null, enabled = true) {
  return useQuery({
    queryKey: [...keys.root(), 'page', page, categoryId ?? 'all'],
    queryFn: () => getNewsPage(page, categoryId),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
    enabled,
  })
}

export function useGetNewsDetail(slug: string) {
  return useQuery({
    queryKey: keys.getNews(slug),
    queryFn: () => getNewsDetail(slug),
  })
}
