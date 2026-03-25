import { useQuery } from '@tanstack/react-query'
import { getNews, getNewsDetail, getNewsInstitutes } from './news.api'

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

export function useGetNewsDetail(slug: string) {
  return useQuery({
    queryKey: keys.getNews(slug),
    queryFn: () => getNewsDetail(slug),
  })
}
