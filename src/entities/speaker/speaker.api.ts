import apiClient from '~shared/lib/api/apiClient';

export const getSpeakerQuery = (facultyId?: number) => {
  const params = facultyId ? { faculty: facultyId } : {}; 
  return apiClient.get('university/student-speakers', { params });
};

export const getSpeakerDetailsQuery = (id: number) => {
  return apiClient.get(`university/student-speakers/${id}`);
};
