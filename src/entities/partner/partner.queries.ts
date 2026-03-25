import { useQuery } from '@tanstack/react-query'
import { getPartners } from './partner.api'

const keys = {
  root: () => ['partner'],
  partner: (slug: string) => [...keys.root(), 'bySlug', slug] as const,
}

export const useGetPartners = () => {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getPartners,
  })
}
