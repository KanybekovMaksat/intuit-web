import axios from "axios";

const API_URL = import.meta.env.VITE_BILIMTRACK_API_URL as string;

export const getEduLevel = async () => {
  const response = await axios.get(`${API_URL}/education-levels/`);
  return response.data;
};

export const getEduCourses = async (organizationId: number) => {
  const { data } = await axios.get(`${API_URL}/courses/`, {
    params: { organization: organizationId },
  });
  return data;
};

export const getGroups = async (organizationId: number) => {
  const { data } = await axios.get(`${API_URL}/groups/`, {
    params: { organization: organizationId },
  });
  return data;
};

export const getGroupsDetails = async (slug: string) => {
  const response = await axios.get(`${API_URL}/groups/${slug}/schedule/`);
  return response.data;
};

// ticher
export const getTeachers = async (organizationId: number) => {
  const { data } = await axios.get(`${API_URL}/teachers`, {
    params: { organization: organizationId },
  });
  return data;
};

export const getTeacherDetails = async (slug: string) => {
  const response = await axios.get(`${API_URL}/teachers/${slug}/schedule/`);
  return response.data;
};
