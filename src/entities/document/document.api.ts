import apiClient from '~shared/lib/api/apiClient'

export function getDocuments() {
  return apiClient.get('documnet-pages/')
}

export function getDetailsDocuments(slug?: string) {
  return apiClient.get(`documnet-pages/${slug}/`)
}
