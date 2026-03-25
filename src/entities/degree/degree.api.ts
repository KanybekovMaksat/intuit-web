import apiClient from '~shared/lib/api/apiClient';
import { DegreeSchema } from './degree.types';

export function getDegreeQuery() {
  return apiClient.get('university/education-levels/');
}

export function getDegreeBySlugQuery(slug: string) {
  return apiClient.get<DegreeSchema>(`university/education-levels/${slug}/`);
}