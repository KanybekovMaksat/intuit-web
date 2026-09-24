import { AxiosProgressEvent } from 'axios'
import apiClient from '~shared/lib/api/apiClient'
import {
  DiscussionMessage,
  DiscussionNotification,
  DissertationDetail,
  Dissertation,
  DissertationFilters,
  MyDissertation,
  Paginated,
  Submission,
} from './dissertation.types'

export function getDissertations({ page, search, discussionStatus, specialty }: DissertationFilters) {
  return apiClient.get<Paginated<Dissertation>>('phd/dissertations/', {
    params: {
      page,
      search: search || undefined,
      discussion_status: discussionStatus || undefined,
      specialty: specialty || undefined,
    },
  })
}

export function getDissertation(id: number) {
  return apiClient.get<DissertationDetail>(`phd/dissertations/${id}/`)
}

export function getMyDissertations() {
  return apiClient.get<MyDissertation[]>('phd/my-dissertations/')
}

export function getSubmission(id: number) {
  return apiClient.get<Submission>(`phd/my-dissertations/${id}/`)
}

/** multipart/form-data: поля + PDF. Без id — новая подача, с id — исправление. */
export type UploadOptions = {
  onUploadProgress?: (event: AxiosProgressEvent) => void
  signal?: AbortSignal
}

export function saveSubmission(data: FormData, id?: number, options: UploadOptions = {}) {
  return id
    ? apiClient.patch<Submission>(`phd/my-dissertations/${id}/`, data, options)
    : apiClient.post<Submission>('phd/my-dissertations/', data, options)
}

export function getSpecialties() {
  return apiClient.get<string[]>('phd/dissertations/specialties/')
}

export function getMessages(dissertationId: number) {
  return apiClient.get<DiscussionMessage[]>(`phd/dissertations/${dissertationId}/messages/`)
}

export function createMessage(dissertationId: number, payload: { text: string; parent?: number }) {
  return apiClient.post<DiscussionMessage>(`phd/dissertations/${dissertationId}/messages/`, payload)
}

export function getNotifications() {
  return apiClient.get<DiscussionNotification[]>('phd/notifications/')
}

export function readNotification(id: number) {
  return apiClient.post(`phd/notifications/${id}/read/`)
}

export function readAllNotifications() {
  return apiClient.post('phd/notifications/read-all/')
}
