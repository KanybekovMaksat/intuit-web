import { useQuery } from '@tanstack/react-query';
import {  getProgramBySlugQuery, getProgramsQuery } from './programs.api';

const keys = {
  root: () => ['program'],
  getProgramBySlug: (slug: string) => [...keys.root(), slug] as const,
  getPrograms: (degreeId?: number, facultyId?: number) => ['program', degreeId, facultyId],
};


export function useGetPrograms(degreeId?: number, facultyId?: number) {
  return useQuery({
    queryKey: keys.getPrograms(degreeId, facultyId),
    queryFn: () => getProgramsQuery(degreeId, facultyId), 
  });
}

export function useGetProgram(slug: string) {
  return useQuery({
    queryKey: keys.getProgramBySlug(slug),
    queryFn: () => getProgramBySlugQuery(slug),
  });
}
