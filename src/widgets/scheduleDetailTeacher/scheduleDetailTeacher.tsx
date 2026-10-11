import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { schedulesQueries } from '~entities/schedules'
import { Loader } from '~shared/ui/loader'
import {
  ScheduleDetailFilter,
  ScheduleDetailLesson,
  ScheduleDetailTop,
} from '~features/scheduleDetail'

const normalizeWeekType = (value: unknown): string => {
  const s = String(value ?? '').trim().toLowerCase()
  if (s === 'weekly' || s === '' || s === 'еженедельно') return ''
  if (s === 'top' || s === 'числитель' || s === 'numerator') return 'top'
  if (s === 'bottom' || s === 'знаменатель' || s === 'denominator') return 'bottom'
  return s
}

const todayIndex = () => {
  const today = new Date().getDay()
  return today >= 1 && today <= 5 ? today - 1 : null
}

export const ScheduleDetailTeacher = () => {
  const { slug } = useParams<{ slug: string }>()
  const [day, setDay] = useState<number | null>(todayIndex())
  const [weekType, setWeekType] = useState<'top' | 'bottom' | null>(null)

  const { data, isError, isLoading } = schedulesQueries.useGetTeacherDetails(slug || '')

  if (!slug) return <Navigate to="/404" replace />
  if (isLoading) return <Loader />
  if (isError || !data) {
    return <p className="py-20 text-center text-ink-soft">Ошибка загрузки расписания</p>
  }

  const { teacher, schedule } = data

  const filtered = schedule.filter((item: { dayOfWeek: number; weekType: string }) => {
    if (day !== null && item.dayOfWeek !== day) return false
    if (weekType) {
      const itemWeek = normalizeWeekType(item.weekType)
      if (itemWeek && itemWeek !== weekType) return false
    }
    return true
  })

  return (
    <div className="mb-20">
      <ScheduleDetailTop fullName={teacher?.fullName ?? 'Преподаватель не указан'} />
      <ScheduleDetailFilter
        currentDay={day}
        onDayChange={setDay}
        currentWeekType={weekType}
        onWeekTypeChange={setWeekType}
      />
      <ScheduleDetailLesson schedule={filtered} />
    </div>
  )
}
