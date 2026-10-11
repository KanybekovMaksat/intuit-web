type Props = {
  currentDay: number | null
  onDayChange: (day: number | null) => void
  currentWeekType: 'top' | 'bottom' | null
  onWeekTypeChange: (type: 'top' | 'bottom' | null) => void
}

const days = [
  { full: 'Понедельник', short: 'Пн' },
  { full: 'Вторник', short: 'Вт' },
  { full: 'Среда', short: 'Ср' },
  { full: 'Четверг', short: 'Чт' },
  { full: 'Пятница', short: 'Пт' },
]

export const ScheduleDetailFilter: React.FC<Props> = ({
  currentDay,
  onDayChange,
  currentWeekType,
  onWeekTypeChange,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="День недели" className="flex flex-wrap gap-2">
        {days.map((day, index) => {
          const active = currentDay === index
          return (
            <button
              key={day.full}
              type="button"
              aria-pressed={active}
              onClick={() => onDayChange(active ? null : index)}
              className={`h-11 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 sm:px-4 ${
                active
                  ? 'bg-primary text-white'
                  : 'border border-line bg-white text-ink hover:border-primary/40'
              }`}
            >
              <span className="xll:hidden">{day.full}</span>
              <span className="hidden xll:inline">{day.short}</span>
            </button>
          )
        })}
      </div>

      <div role="group" aria-label="Тип недели" className="inline-flex rounded-full bg-gray-light p-1">
        {(['top', 'bottom'] as const).map((type) => {
          const active = currentWeekType === type
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onWeekTypeChange(active ? null : type)}
              className={`h-9 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                active ? 'bg-white text-primary shadow-sm' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {type === 'top' ? 'Числитель' : 'Знаменатель'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
