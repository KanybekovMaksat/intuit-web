import { useQuery } from "@tanstack/react-query";
import {
  getEduCourses,
  getEduLevel,
  getGroups,
  getGroupsDetails,
  getTeacherDetails,
  getTeachers,
} from "./schedules.api";
import { EducationLevel, Course, Group, Teacher } from "./schedules.types";

const keys = {
  root: () => ["eduLvl"],
  courses: (organizationId: number) => [
    ...keys.root(),
    `courses${organizationId}`,
  ],
  groups: (organizationId: number) => [
    ...keys.root(),
    `groups${organizationId}`,
  ],
  groupsDetail: (slug: string) => [...keys.root(), slug] as const,
  // teacher
  teacher: (organizationId: number) =>
    [`scheduleTeacher${organizationId}`] as const,
  teacherDetail: (organizationId: number, slug: string) =>
    [...keys.teacher(organizationId), slug] as const,
};

export function useGetEduLvl() {
  return useQuery<EducationLevel[]>({
    queryKey: keys.root(),
    queryFn: getEduLevel,
  });
}

export function useGetCourses(organizationId: number) {
  return useQuery<Course[]>({
    queryKey: keys.courses(organizationId),
    queryFn: () => getEduCourses(organizationId),
  });
}

export function useGetGroups(organizationId: number) {
  return useQuery<Group[]>({
    queryKey: keys.groups(organizationId), // ключ зависит от ID
    queryFn: () => getGroups(organizationId),
    enabled: !!organizationId, // запрос сработает только если ID задан
  });
}

export function useGetGroupsDetails(slug: string) {
  return useQuery({
    queryKey: keys.groupsDetail(slug),
    queryFn: () => getGroupsDetails(slug),
  });
}

// ----------teachers

export function useGetTeachers(organizationId: number) {
  return useQuery<Teacher[]>({
    queryKey: keys.teacher(organizationId),
    queryFn: () => getTeachers(organizationId),
  });
}

export function useGetTeacherDetails(slug: string) {
  return useQuery({
    queryKey: keys.teacherDetail(slug),
    queryFn: () => getTeacherDetails(slug),
  });
}
