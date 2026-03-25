import { useQuery } from '@tanstack/react-query';
import { getDegreeBySlugQuery, getDegreeQuery } from './degree.api';

const keys = {
  root: () => ['degree'],
  getDegreeBySlug: (slug: string) => [...keys.root(), slug] as const,
};

export function useGetDegrees() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getDegreeQuery,
  });
}

export function useGetDegree(slug:string) {
  return useQuery({
    queryKey: keys.getDegreeBySlug(slug),
    queryFn: () => getDegreeBySlugQuery(slug),
  });
}
