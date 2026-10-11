import { useMemo } from 'react'
import { GraduationCap } from 'lucide-react'
import { t } from 'i18next'
import { specializationQueries, specializationTypes } from '~entities/specialization'
import { getApiList } from '~shared/lib/api/getApiList'
import { LinkCard } from '~shared/ui/page'
import { levelTitles } from '../lib/kind'

type ProgramListItem = {
  id: number | string
  title: string
  slug: string
  educationLevel?: { id: number; title: string }[]
  faculty?: { id: number; title: string }[]
}

const norm = (value: string) => value.trim().toLowerCase()

/** Three more programs of the same level, same institute first. One cached list request. */
export const RelatedPrograms = ({
  slug,
  educationLevel,
  faculty,
}: specializationTypes.Specialization) => {
  const { data } = specializationQueries.useGetSpecializationList()
  const all = getApiList<ProgramListItem>(data?.data)

  const related = useMemo(() => {
    const levels = levelTitles(educationLevel).map(norm)
    const facultyIds = new Set((faculty || []) as unknown as number[])
    const seen = new Set<string>()

    return all
      .filter((item) => item.slug !== slug)
      .filter((item) => levelTitles(item.educationLevel).some((level) => levels.includes(norm(level))))
      .map((item) => ({
        item,
        sameFaculty: (item.faculty || []).some((f) => facultyIds.has(f.id)),
      }))
      .sort((a, b) => Number(b.sameFaculty) - Number(a.sameFaculty))
      .filter(({ item }) => {
        // "Title" and "Title (магистратура)" are the same program entered twice
        const key = norm(item.title.replace(/\s*\([^)]*\)\s*$/, ''))
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, 3)
      .map(({ item }) => item)
  }, [all, slug, educationLevel, faculty])

  if (related.length === 0) return null

  return (
    <section className="mt-16 lg:mt-12">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.5rem]">
        {t('specialization.related', 'Другие программы')}
      </h2>
      <ul className="mt-8 grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
        {related.map((item) => (
          <li key={item.slug}>
            <LinkCard
              title={item.title}
              description={levelTitles(item.educationLevel).join(', ')}
              to={`/specialization/${item.slug}`}
              icon={<GraduationCap size={26} aria-hidden />}
              label={t('specialization.more', 'Подробнее')}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
