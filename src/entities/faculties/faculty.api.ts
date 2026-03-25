import apiClient from '~shared/lib/api/apiClient';
import { FacultySchema } from './faculty.types';

export function getFaculties() {
  return apiClient.get('university/faculties/');
}

export function getFacultyBySlugQuery(slug: string) {
  return apiClient.get<FacultySchema>(`university/faculties/${slug}/`);
}
