import apiClient from '~shared/lib/api/apiClient'

export const getFeedbackQuery = () => {
  return apiClient.get('university/student-reviews')
}

export const getFeedbackDetailsQuery = (id: number) => {
  return apiClient.get(`university/student-reviews/${id}/`)
}
