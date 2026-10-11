import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface Props {
  name?: string
  curatorName?: string
  fullName?: string
  weekType?: string
}

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-white/65">{label}</p>
    <p className="mt-1 text-xl font-semibold leading-snug sm:text-lg">{value}</p>
  </div>
)

export const ScheduleDetailTop = ({ name, curatorName, fullName, weekType }: Props) => {
  const navigate = useNavigate()

  return (
    <header
      className="mb-6 mt-5 flex items-center justify-between gap-6 overflow-hidden rounded-3xl bg-primary px-10 py-8 text-white lg:flex-col lg:items-start lg:px-6 sm:rounded-2xl sm:px-4"
      style={{
        backgroundImage:
          'radial-gradient(50% 120% at 100% 120%, rgba(0,149,111,0.5) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      <div className="flex flex-wrap items-start gap-x-12 gap-y-5">
        {name && <Fact label="Расписание группы" value={name} />}
        {curatorName && <Fact label="Куратор" value={curatorName} />}
        {fullName && <Fact label="Преподаватель" value={fullName} />}
        {weekType && (
          <Fact
            label="Эта неделя"
            value={weekType === 'top' ? 'Числитель' : 'Знаменатель'}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98] lg:w-full lg:justify-center"
      >
        <ArrowLeft size={18} aria-hidden />
        {fullName ? 'Сменить преподавателя' : 'Сменить группу'}
      </button>
    </header>
  )
}
