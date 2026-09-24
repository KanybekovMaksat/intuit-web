import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { clearAuthToken, getAuthToken, setAuthToken } from '~shared/lib/api/apiClient'
import { getMe, login, logout, register } from './session.api'
import { AuthResponse } from './session.types'

export const sessionKeys = {
  root: () => ['session'] as const,
  me: () => [...sessionKeys.root(), 'me'] as const,
}

export function useCurrentUser() {
  const token = getAuthToken()
  const query = useQuery({
    queryKey: sessionKeys.me(),
    queryFn: async () => (await getMe()).data,
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 10,
  })
  const user = token ? query.data ?? null : null
  return { user, isLoading: Boolean(token) && query.isLoading }
}

function useOnAuthenticated() {
  const queryClient = useQueryClient()
  return ({ data }: { data: AuthResponse }) => {
    setAuthToken(data.token)
    queryClient.setQueryData(sessionKeys.me(), data.user)
    // Данные, зависящие от пользователя (права, «мои» сообщения), перезапрашиваем
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] !== sessionKeys.root()[0],
    })
  }
}

export function useLogin() {
  return useMutation({ mutationFn: login, onSuccess: useOnAuthenticated() })
}

export function useRegister() {
  return useMutation({ mutationFn: register, onSuccess: useOnAuthenticated() })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuthToken()
      queryClient.setQueryData(sessionKeys.me(), null)
      queryClient.invalidateQueries()
    },
  })
}
