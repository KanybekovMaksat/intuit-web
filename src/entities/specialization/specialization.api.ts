import apiClient from '~shared/lib/api/apiClient'

export const getSpecializationDetail = (slug: string) => {
  return apiClient.get(`university/programs/${slug}`)
}
