import apiClient from '~shared/lib/api/apiClient';

export const getPartners = () => {
  return apiClient.get('university/partners/');
};
