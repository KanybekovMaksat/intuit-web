import React from 'react'
import { DoorOpen, Clock, UserRound } from 'lucide-react'

type GroupItem = {
  id: number
  name: string
}

type ScheduleItem = {
  id: number
  subject: { name: string }
  teacher?: { fullName: string }
  room: { number: string; building: string }
  lessonTime: { startTime: string; endTime: string }
  lessonType: { name: string }
  dayOfWeek: number
  weekType: string
  groups?: GroupItem[]
}

type Props = {
  schedule: ScheduleItem[]
}

const weekLabel = (type: string): string => {
  switch (type) {
    case 'top':
      return 'Числитель'
    case 'bottom':
      return 'Знаменатель'
    default:
      return ''
  }
}

/** One responsive layout for every screen: number, time, subject, then people and room. */
export const ScheduleDetailLesson: React.FC<Props> = ({ schedule }) => {
  if (schedule.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-white px-6 py-14 text-center">
        <p className="text-lg font-semibold text-ink">Занятий нет</p>
        <p className="mt-1 text-ink-soft">Выберите другой день или тип недели</p>
      </div>
    )
  }

  return (
    <ol className="grid gap-3">
      {schedule.map((lesson, index) => {
        const label = weekLabel(lesson.weekType)
        return (
          <li
            key={lesson.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-2xl border border-line bg-white p-5 md:grid-cols-[auto_minmax(0,1fr)] sm:gap-4 sm:p-4"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-semibold tabular-nums text-white">
              {index + 1}
            </span>

            <div className="min-w-0">
              <p className="text-lg font-semibold leading-snug text-ink break-words">
                {lesson.subject?.name || '-'}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-light px-3 py-1 font-medium tabular-nums text-ink">
                  <Clock size={14} aria-hidden />
                  {lesson.lessonTime.startTime} - {lesson.lessonTime.endTime}
                </span>
                {lesson.lessonType?.name && (
                  <span className="rounded-full bg-green-dark/10 px-3 py-1 font-medium text-green-dark">
                    {lesson.lessonType.name}
                  </span>
                )}
                {label && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {label}
                  </span>
                )}
              </div>
              {lesson.teacher?.fullName && (
                <p className="mt-3 inline-flex items-center gap-2 text-[15px] text-ink-soft">
                  <UserRound size={16} aria-hidden />
                  {lesson.teacher.fullName}
                </p>
              )}
              {lesson.groups && lesson.groups.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {lesson.groups.map((group) => (
                    <li
                      key={group.id}
                      className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft"
                    >
                      {group.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gray-light px-4 py-2 text-sm font-semibold text-ink md:col-start-2 md:justify-self-start">
              <DoorOpen size={16} aria-hidden />
              Кабинет {lesson.room?.number}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
