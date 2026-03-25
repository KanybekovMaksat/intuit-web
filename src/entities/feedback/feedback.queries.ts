import { useQuery } from '@tanstack/react-query'
import { getFeedbackQuery } from './feedback.api'

const keys = {
  root: () => ['feedback'],
}

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getFeedbackQuery,
  })
}
