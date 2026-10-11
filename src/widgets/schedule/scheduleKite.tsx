import { useEffect, useMemo, useState } from 'react'
import { schedulesQueries } from '~entities/schedules'
import { Course, Group, Teacher } from '~entities/schedules/schedules.types'
import { ScheduleView, type ScheduleMode } from './schedule-view.ui'

export const ScheduleKite = () => {
  const [mode, setMode] = useState<ScheduleMode>('student')
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: groupsData = [] } = schedulesQueries.useGetGroups(3)
  const { data: teachersData = [] } = schedulesQueries.useGetTeachers(3)
  const { data: coursesData = [] } = schedulesQueries.useGetCourses(3)

  useEffect(() => {
    if (coursesData.length > 0) {
      setSelectedCourseId(coursesData[0].id)
    }
  }, [coursesData])

  const query = searchQuery.toLowerCase()

  const filteredGroups = useMemo(() => {
    if (!groupsData || selectedCourseId === null) return []
    return groupsData
      .filter(
        (group: Group) =>
          group.course?.id === selectedCourseId &&
          group.name?.toLowerCase().includes(query)
      )
      .sort((a: Group, b: Group) => (a.name || '').localeCompare(b.name || ''))
  }, [groupsData, selectedCourseId, query])

  const filteredTeachers = useMemo(() => {
    if (!teachersData) return []
    return teachersData
      .filter((teacher: Teacher) => (teacher.fullName || '').toLowerCase().includes(query))
      .sort((a: Teacher, b: Teacher) => (a.fullName || '').localeCompare(b.fullName || ''))
  }, [teachersData, query])

  return (
    <ScheduleView
      mode={mode}
      onModeChange={setMode}
      courses={coursesData.map((course: Course) => ({
        id: course.id,
        label: `${course.number} курс`,
      }))}
      activeCourse={selectedCourseId}
      onCourseChange={setSelectedCourseId}
      query={searchQuery}
      onQueryChange={setSearchQuery}
      groups={filteredGroups}
      teachers={filteredTeachers}
    />
  )
}
