import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMessage,
  getDissertation,
  getDissertations,
  getMessages,
  getMyDissertations,
  getNotifications,
  getSpecialties,
  getSubmission,
  readAllNotifications,
  saveSubmission,
  readNotification,
} from './dissertation.api'
import { DissertationFilters } from './dissertation.types'

export const dissertationKeys = {
  root: () => ['dissertations'] as const,
  list: (filters: DissertationFilters) => [...dissertationKeys.root(), 'list', filters] as const,
  detail: (id: number) => [...dissertationKeys.root(), 'detail', id] as const,
  messages: (id: number) => [...dissertationKeys.root(), 'messages', id] as const,
  my: () => [...dissertationKeys.root(), 'my'] as const,
  specialties: () => [...dissertationKeys.root(), 'specialties'] as const,
  notifications: () => [...dissertationKeys.root(), 'notifications'] as const,
  submission: (id: number) => [...dissertationKeys.root(), 'submission', id] as const,
}

export function useDissertations(filters: DissertationFilters) {
  return useQuery({
    queryKey: dissertationKeys.list(filters),
    queryFn: async () => (await getDissertations(filters)).data,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  })
}

export function useDissertation(id: number) {
  return useQuery({
    queryKey: dissertationKeys.detail(id),
    queryFn: async () => (await getDissertation(id)).data,
    enabled: Number.isFinite(id),
    staleTime: 1000 * 30,
  })
}

export function useMyDissertations(enabled: boolean) {
  return useQuery({
    queryKey: dissertationKeys.my(),
    queryFn: async () => (await getMyDissertations()).data,
    enabled,
    staleTime: 1000 * 30,
  })
}

export function useSpecialties() {
  return useQuery({
    queryKey: dissertationKeys.specialties(),
    queryFn: async () => (await getSpecialties()).data,
  })
}

export function useMessages(id: number) {
  return useQuery({
    queryKey: dissertationKeys.messages(id),
    queryFn: async () => (await getMessages(id)).data,
    enabled: Number.isFinite(id),
    staleTime: 1000 * 15,
  })
}

export function useCreateMessage(dissertationId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { text: string; parent?: number }) =>
      createMessage(dissertationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dissertationKeys.messages(dissertationId) })
      queryClient.invalidateQueries({ queryKey: dissertationKeys.detail(dissertationId) })
      queryClient.invalidateQueries({ queryKey: dissertationKeys.my() })
    },
  })
}

export function useNotifications(enabled: boolean) {
  return useQuery({
    queryKey: dissertationKeys.notifications(),
    queryFn: async () => (await getNotifications()).data,
    enabled,
    staleTime: 1000 * 30,
  })
}

export function useReadNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id?: number) => (id ? readNotification(id) : readAllNotifications()),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dissertationKeys.notifications() }),
  })
}

export function useSubmission(id?: number) {
  return useQuery({
    queryKey: dissertationKeys.submission(id ?? 0),
    queryFn: async () => (await getSubmission(id as number)).data,
    enabled: Boolean(id),
    staleTime: 0,
  })
}

export function useSaveSubmission(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => saveSubmission(data, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: dissertationKeys.root() }),
  })
}
