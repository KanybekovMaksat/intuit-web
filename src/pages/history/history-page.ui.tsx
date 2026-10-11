import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero, DataTable } from '~shared/ui/page'

const bachelorIds = Array.from({ length: 18 }, (_, i) => i + 1)
const masterIds = [1, 2, 3, 4, 5]

export const HistoryPage = () => {
  const { t, i18n } = useTranslation()

  // A key that comes back unchanged has no translation: skip those rows
  const data = useMemo(() => {
    const has = (value: string, key: string) => value !== key
    const byText =
      (field: string) =>
      <T extends object>(a: T, b: T) =>
        String((a as Record<string, unknown>)[field]).localeCompare(
          String((b as Record<string, unknown>)[field])
        )

    const bachelor = bachelorIds
      .map((id) => ({
        keys: [`historypage.code${id}`, `historypage.program${id}`, `historypage.profile${id}`],
        code: t(`historypage.code${id}`),
        program: t(`historypage.program${id}`),
        profile: t(`historypage.profile${id}`),
      }))
      .filter(
        (row) =>
          has(row.code, row.keys[0]) && has(row.program, row.keys[1]) && has(row.profile, row.keys[2])
      )
      .sort(byText('program'))

    const master = masterIds
      .map((id) => ({
        keys: [
          `historypage.masterPrograms.code${id}`,
          `historypage.masterPrograms.program${id}`,
          `historypage.masterPrograms.details${id}`,
        ],
        code: t(`historypage.masterPrograms.code${id}`),
        program: t(`historypage.masterPrograms.program${id}`),
        details: t(`historypage.masterPrograms.details${id}`),
      }))
      .filter(
        (row) =>
          has(row.code, row.keys[0]) && has(row.program, row.keys[1]) && has(row.details, row.keys[2])
      )
      .sort(byText('program'))

    const postgraduate = Array.from({ length: 9 }, (_, i) => {
      const codeKey = `historypage.postgraduateSpecialties.code${i + 1}`
      const specialtyKey = `historypage.postgraduateSpecialties.specialty${i + 1}`
      return { codeKey, specialtyKey, code: t(codeKey), specialty: t(specialtyKey) }
    })
      .filter((row) => has(row.code, row.codeKey) && has(row.specialty, row.specialtyKey))
      .sort(byText('specialty'))

    const courses = Array.from({ length: 13 }, (_, i) => {
      const key = `historypage.additionalCourses.course${i + 1}`
      return { key, course: t(key) }
    })
      .filter((row) => has(row.course, row.key))
      .sort(byText('course'))

    const structure = Array.from({ length: 29 }, (_, i) => {
      const key = `historypage.structureItems.title${i + 1}`
      return { key, title: t(key) }
    })
      .filter((row) => has(row.title, row.key))
      .sort(byText('title'))

    return { bachelor, master, postgraduate, courses, structure }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const textBlocks = [
    { title: t('historypage.adress'), text: t('historypage.location') },
    { title: t('historypage.Educational'), text: t('historypage.content2') },
  ]

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('historypage.InternationalUniversity')}
        crumbs={[{ label: t('aboutPage.title', 'Об университете'), to: '/about' }]}
      />

      <section className="mt-10 rounded-3xl bg-gray-light p-8 sm:p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{t('historypage.history')}</h2>
        <p className="mt-3 max-w-[75ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          {t('historypage.content')}
        </p>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-1">
        {textBlocks.map((block) => (
          <section
            key={block.title}
            className="rounded-3xl border border-line bg-white p-8 sm:p-5"
          >
            <h2 className="text-xl font-semibold tracking-tight text-ink">{block.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{block.text}</p>
          </section>
        ))}
      </div>

      {data.bachelor.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
            {t('historypage.bachelor')}
          </h2>
          <DataTable
            columns={[
              { key: 'code', label: t('historypage.code') },
              { key: 'program', label: t('historypage.programma') },
              { key: 'profile', label: t('historypage.profil') },
            ]}
            rows={data.bachelor}
          />
        </section>
      )}

      {data.master.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
            {t('historypage.master')}
          </h2>
          <DataTable
            columns={[
              { key: 'code', label: t('historypage.code') },
              { key: 'program', label: t('historypage.programma') },
              { key: 'details', label: t('historypage.programms') },
            ]}
            rows={data.master}
          />
        </section>
      )}

      {data.postgraduate.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
            {t('historypage.doctoral')}
          </h2>
          <DataTable
            columns={[
              { key: 'code', label: t('historypage.code') },
              { key: 'specialty', label: t('historypage.specialty') },
            ]}
            rows={data.postgraduate}
          />
        </section>
      )}

      {data.courses.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
            {t('historypage.continuing')}
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {data.courses.map((item) => (
              <li
                key={item.key}
                className="rounded-2xl border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink"
              >
                {item.course}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.structure.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
            {t('historypage.structure')}
          </h2>
          <ul className="grid grid-cols-4 gap-3 xll:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {data.structure.map((item) => (
              <li
                key={item.key}
                className="rounded-2xl bg-gray-light px-5 py-4 text-[15px] font-medium leading-snug text-ink"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-1">
        <section className="rounded-3xl bg-primary p-8 text-white sm:p-5">
          <h2 className="text-xl font-semibold tracking-tight">{t('historypage.funding')}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">{t('historypage.title')}</p>
        </section>
        <section className="rounded-3xl border border-line bg-white p-8 sm:p-5">
          <h2 className="text-xl font-semibold tracking-tight text-ink">{t('historypage.contact')}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t('historypage.location2')}</p>
        </section>
      </div>
    </div>
  )
}
