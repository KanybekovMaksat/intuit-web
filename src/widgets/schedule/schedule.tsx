import { useEffect, useMemo, useState } from 'react'
import { schedulesQueries } from '~entities/schedules'
import {
  EducationLevel,
  Course,
  Group,
  Teacher,
} from '~entities/schedules/schedules.types'
import { ScheduleView, type ScheduleMode } from './schedule-view.ui'

export const Schedule = () => {
  const [mode, setMode] = useState<ScheduleMode>('student')
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState('Бакалавриат')

  const { data: groupsData = [] } = schedulesQueries.useGetGroups(1)
  const { data: teachersData = [] } = schedulesQueries.useGetTeachers(1)
  const { data: eduLvlData } = schedulesQueries.useGetEduLvl()
  const { data: coursesData } = schedulesQueries.useGetCourses(1)

  const selectedLevel = useMemo(
    () => eduLvlData?.find((level: EducationLevel) => level.name === activeLevel),
    [eduLvlData, activeLevel]
  )

  const relevantCourses = useMemo(() => {
    if (!coursesData || !selectedLevel) return []
    return coursesData.filter(
      (course: Course) => course.educationLevel === selectedLevel.id
    )
  }, [coursesData, selectedLevel])

  useEffect(() => {
    setSelectedCourseId(relevantCourses.length > 0 ? relevantCourses[0].id : null)
  }, [relevantCourses])

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
      levels={eduLvlData?.map((level: EducationLevel) => ({
        id: level.name,
        label: level.name,
      }))}
      activeLevel={activeLevel}
      onLevelChange={(id) => setActiveLevel(String(id))}
      courses={relevantCourses.map((course: Course) => ({
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
