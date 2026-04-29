type PaginatedData<T> = {
  results?: T[]
}

export const getApiList = <T>(data: unknown): T[] => {
  if (Array.isArray(data)) {
    return data as T[]
  }

  if (
    data &&
    typeof data === 'object' &&
    Array.isArray((data as PaginatedData<T>).results)
  ) {
    return (data as PaginatedData<T>).results || []
  }

  return []
}
