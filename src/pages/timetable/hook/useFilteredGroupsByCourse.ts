import { useMemo } from "react";

export interface ApiGroup {
  id: number;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  students: number;
  subjects: string[];
  course?: {
    id: number;
    number: number;
  };
}

export function useFilteredGroupsByCourse(
  schedulesGroups: ApiGroup[] | undefined,
  selectedCourseId: string | undefined
): Group[] {
  const apiGroups: Group[] = useMemo(() => {
    return (
      schedulesGroups?.map((g) => ({
        id: String(g.id),
        name: g.name,
        students: 0,
        subjects: [],
        course: g.course,
      })) || []
    );
  }, [schedulesGroups]);

  const filteredGroups = useMemo(() => {
    if (!selectedCourseId) return apiGroups;
    return apiGroups.filter(
      (group) => group.course?.id?.toString() === selectedCourseId
    );
  }, [apiGroups, selectedCourseId]);

  return filteredGroups;
}
