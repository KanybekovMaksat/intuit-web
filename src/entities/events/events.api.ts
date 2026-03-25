import apiClient from '~shared/lib/api/apiClient'

export const getEvents = () => {
  return apiClient.get('/news/events/')
}
export function getEventDetail(slug: string) {
  return apiClient.get(`news/events/${slug}/`)
}
