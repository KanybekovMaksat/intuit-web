import apiClient from '~shared/lib/api/apiClient'

export const getStaffQuery = (facultyId?: number) => {
  const url = facultyId
    ? `university/staffs/?faculty=${facultyId}`
    : `university/staffs/`
  return apiClient.get(url)
}

export const getStaffDetailsQuery = (string: string) => {
  return apiClient.get(`university/staffs/${string}/`)
}

export const getStaffPositions = () => {
  return apiClient.get('university/positions/')
}
