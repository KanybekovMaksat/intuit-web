import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { facultyQueries } from '~entities/faculties'
import { FacultySchema } from '~entities/faculties/faculty.types'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'

/** Institutes as a plain grid of links (kept under the old name for the existing import). */
export const FacultyCarousel: React.FC = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = facultyQueries.useGetFaculties()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div className="py-10 text-center text-ink-soft">{t('loading.error')}</div>
  }

  const faculties = getApiList<FacultySchema>(data?.data)

  return (
    <ul className="mt-10 grid grid-cols-4 gap-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
      {faculties.map((faculty) => (
        <li key={faculty.slug}>
          <Link
            to={`/institutes/${faculty.slug}`}
            className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 text-[15px] font-semibold leading-snug text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(42,33,114,0.35)]"
          >
            <span>{faculty.subtitle}</span>
            <ArrowUpRight
              size={18}
              aria-hidden
              className="mt-0.5 shrink-0 text-ink-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
