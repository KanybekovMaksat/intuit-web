import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, GraduationCap, CalendarDays } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p
        aria-hidden
        className="select-none text-[9rem] font-semibold leading-none tracking-tighter text-primary/15 md:text-[6rem]"
      >
        404
      </p>

      <h1 className="-mt-4 text-3xl font-semibold tracking-tight text-ink md:text-2xl">
        {t('errors.pageNotFound', 'Страница не найдена')}
      </h1>

      <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-soft">
        {t(
          'errors.pageNotFoundDesc',
          'К сожалению, запрашиваемая страница перемещена или не существует. Проверьте правильность адреса или воспользуйтесь разделами ниже.'
        )}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-green-dark px-6 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary active:scale-[0.98]"
        >
          {t('errors.goHome', 'На главную')}
          <ArrowRight size={18} aria-hidden />
        </Link>
        <Link
          to="/colleges"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-primary/40"
        >
          <GraduationCap size={18} aria-hidden />
          {t('errors.colleges', 'Направления')}
        </Link>
        <Link
          to="/schedule"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-primary/40"
        >
          <CalendarDays size={18} aria-hidden />
          {t('errors.schedule', 'Расписание')}
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
