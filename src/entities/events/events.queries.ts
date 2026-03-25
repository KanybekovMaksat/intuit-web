import { useQuery } from '@tanstack/react-query'
import { getEventDetail, getEvents } from './events.api'

const keys = {
  root: () => ['events'],
  event: (slug: string) => [...keys.root(), 'bySlug', slug] as const,
}

export const useGetEvents = () => {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getEvents,
  })
}
export function useGetEventDetail(slug: string) {
  return useQuery({
    queryKey: keys.event(slug),
    queryFn: () => getEventDetail(slug),
  })
}
