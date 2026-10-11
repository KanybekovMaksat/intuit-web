import { useQuery } from '@tanstack/react-query'
import { getSpecializationDetail, getSpecializationList } from './specialization.api'

const keys = {
  root: () => ['specialization'],
  list: () => [...keys.root(), 'list'] as const,
  specialization: (slug: string) => [...keys.root(), 'bySlug', slug] as const,
}

export const useGetSpecialization = (slug: string) => {
  return useQuery({
    queryKey: keys.specialization(slug),
    queryFn: () => getSpecializationDetail(slug),
  })
}

export const useGetSpecializationList = (enabled = true) => {
  return useQuery({
    queryKey: keys.list(),
    queryFn: getSpecializationList,
    enabled,
    staleTime: 5 * 60 * 1000,
  })
}
