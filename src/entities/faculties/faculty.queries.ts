import { useQuery } from '@tanstack/react-query';
import { getFaculties, getFacultyBySlugQuery } from './faculty.api';

const keys = {
  root: () => ['faculty'],
  getFaculty: (slug: string) => [...keys.root(), slug] as const,
};

export function useGetFaculties() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getFaculties,
  });
}

export function useGetFaculty(slug: string) {
  return useQuery({
    queryKey: keys.getFaculty(slug),
    queryFn: () => getFacultyBySlugQuery(slug),
  });
}
