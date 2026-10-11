import { Link } from 'react-router-dom'
import { ChevronRight, GraduationCap, Search, UserRound } from 'lucide-react'
import { t } from 'i18next'
import { pathKeys } from '~shared/lib/react-router'

export type ScheduleMode = 'student' | 'teacher'

interface Option {
  id: number | string
  label: string
}

interface ScheduleViewProps {
  mode: ScheduleMode
  onModeChange: (mode: ScheduleMode) => void
  levels?: Option[]
  activeLevel?: string | number
  onLevelChange?: (id: string | number) => void
  courses: Option[]
  activeCourse: number | null
  onCourseChange: (id: number) => void
  query: string
  onQueryChange: (value: string) => void
  groups: { id: number; name: string }[]
  teachers: { id: number; fullName?: string }[]
}

const pill = (active: boolean) =>
  `h-10 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
    active
      ? 'bg-primary text-white'
      : 'border border-line bg-white text-ink hover:border-primary/40'
  }`

/** Presentation for the schedule picker: pick a group or a teacher, then open their timetable. */
export const ScheduleView = ({
  mode,
  onModeChange,
  levels,
  activeLevel,
  onLevelChange,
  courses,
  activeCourse,
  onCourseChange,
  query,
  onQueryChange,
  groups,
  teachers,
}: ScheduleViewProps) => {
  const isStudent = mode === 'student'
  const items = isStudent
    ? groups.map((group) => ({
        id: group.id,
        label: group.name,
        to: pathKeys.schedule.bySlugGroup(group.id),
      }))
    : teachers.map((teacher) => ({
        id: teacher.id,
        label: teacher.fullName || 'Неизвестный преподаватель',
        to: pathKeys.schedule.bySlugTeacher(teacher.id),
      }))

  return (
    <div className="grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start gap-6 lg:grid-cols-1">
      <div className="rounded-3xl bg-gray-light p-6 sm:p-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {t('studentsPage.schedule')}
        </h2>

        <div
          role="tablist"
          className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-white p-1 ring-1 ring-line"
        >
          {(
            [
              { id: 'student', label: 'Студент', icon: GraduationCap },
              { id: 'teacher', label: 'Преподаватель', icon: UserRound },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => onModeChange(id)}
              className={`flex h-10 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                mode === id ? 'bg-primary text-white' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <Icon size={16} aria-hidden />
              {label}
            </button>
          ))}
        </div>

        {isStudent && levels && levels.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => onLevelChange?.(level.id)}
                className={pill(activeLevel === level.id)}
              >
                {level.label}
              </button>
            ))}
          </div>
        )}

        {isStudent &&
          (courses.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => onCourseChange(Number(course.id))}
                  className={pill(activeCourse === course.id)}
                >
                  {course.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">
              Нет курсов для выбранного уровня образования
            </p>
          ))}

        <label className="relative mt-5 block">
          <span className="sr-only">
            {isStudent ? 'Поиск группы' : 'Поиск преподавателя'}
          </span>
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={isStudent ? 'Поиск группы' : 'Поиск преподавателя'}
            className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
          />
        </label>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6 sm:p-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            {isStudent ? 'Группы' : 'Преподаватели'}
          </h3>
          <span className="text-sm tabular-nums text-ink-soft">{items.length}</span>
        </div>

        {items.length === 0 ? (
          <p className="py-10 text-center text-ink-soft">
            {isStudent ? 'Группы не найдены' : 'Преподаватели не найдены'}
          </p>
        ) : (
          <ul className="mt-4 grid max-h-[480px] grid-cols-2 gap-2 overflow-y-auto pr-1 md:grid-cols-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-[15px] font-medium text-ink transition-all duration-200 hover:border-primary/30 hover:bg-gray-light"
                >
                  <span className="break-words">{item.label}</span>
                  <ChevronRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
