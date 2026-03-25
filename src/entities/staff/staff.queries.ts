import { useQuery } from '@tanstack/react-query'
import {
  getStaffDetailsQuery,
  getStaffQuery,
  getStaffPositions,
} from './staff.api'

const keys = {
  root: () => ['staff'],
  staff: (slug: string) => [...keys.root(), 'bySlug', slug] as const,
  position: () => [keys.root(), 'positions'] as const,
  institute: (facultyId?: number) =>
    [keys.root(), 'facultyId', facultyId] as const,
}
export const useGetStaffs = (facultyId?: number) => {
  return useQuery({
    queryKey: keys.institute(facultyId),
    queryFn: () => getStaffQuery(facultyId),
  })
}
export const useGetStaffDetail = (slug: string) => {
  return useQuery({
    queryKey: keys.staff(slug),
    queryFn: () => getStaffDetailsQuery(slug),
  })
}
export const useGetStaffPositions = () => {
  return useQuery({
    queryKey: keys.position(),
    queryFn: getStaffPositions,
  })
}
