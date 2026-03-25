import { useQuery } from '@tanstack/react-query'
import { getSpecializationDetail } from './specialization.api'

const keys = {
  root: () => ['specialization'],
  specialization: (slug: string) => [...keys.root(), 'bySlug', slug] as const,
}

export const useGetSpecialization = (slug: string) => {
  return useQuery({
    queryKey: keys.specialization(slug),
    queryFn: () => getSpecializationDetail(slug),
  })
}
