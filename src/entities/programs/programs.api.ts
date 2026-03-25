import apiClient from '~shared/lib/api/apiClient';

// export function getProgramsQuery() {
//   return apiClient.get('university/programs/');
// }
export function getProgramsQuery(degreeId?: number, facultyId?: number) {
  const params: any = {};
  if (degreeId) params.educationLevel = degreeId;
  if (facultyId) params.faculty = facultyId;

  return apiClient.get('university/programs/', { params });
}

export function getProgramBySlugQuery(slug: string) {
  return apiClient.get(`university/programs/${slug}/`);
}
