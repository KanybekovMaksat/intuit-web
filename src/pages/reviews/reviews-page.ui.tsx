import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SpeakerVideo, speakerQueries } from '~entities/speaker'
import { facultyQueries } from '~entities/faculties'
import { degreeQueries } from '~entities/degree'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { PageHero, SearchField, SelectField, FilterSummary } from '~shared/ui/page'

type Speaker = {
  id: number
  name: string
  description?: string
  faculty?: number[]
  educationLevel?: number[]
}

export const ReviewsPage = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = speakerQueries.useGetSpeakers()
  const { data: facultyData } = facultyQueries.useGetFaculties()
  const { data: degreeData } = degreeQueries.useGetDegrees()

  const speakers = getApiList<Speaker>(data?.data)
  const faculties = getApiList<{ id: number; subtitle: string }>(facultyData?.data)
  const degrees = getApiList<{ id: number; title: string }>(degreeData?.data)

  const [query, setQuery] = useState('')
  const [faculty, setFaculty] = useState('')
  const [level, setLevel] = useState('')

  // Offer only values that have at least one review
  const facultyOptions = useMemo(
    () => faculties.filter((item) => speakers.some((s) => s.faculty?.includes(item.id))),
    [faculties, speakers]
  )
  const levelOptions = useMemo(
    () => degrees.filter((item) => speakers.some((s) => s.educationLevel?.includes(item.id))),
    [degrees, speakers]
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return speakers.filter((speaker) => {
      if (faculty && !speaker.faculty?.includes(Number(faculty))) return false
      if (level && !speaker.educationLevel?.includes(Number(level))) return false
      if (
        needle &&
        !`${speaker.name} ${speaker.description || ''}`.toLowerCase().includes(needle)
      )
        return false
      return true
    })
  }, [speakers, query, faculty, level])

  const hasFilters = Boolean(query || faculty || level)
  const reset = () => {
    setQuery('')
    setFaculty('')
    setLevel('')
  }

  return (
    <div className="mb-20">
      <PageHero compact title={t('reviews.studentReviews')} />

      <div className="mt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,300px)_200px] gap-3 lg:grid-cols-2 md:grid-cols-1">
          <div className="flex lg:col-span-2 md:col-span-1">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={t('reviews.search', 'Поиск по имени')}
            />
          </div>
          <SelectField
            label={t('reviews.institute', 'Институт')}
            value={faculty}
            onChange={setFaculty}
            options={[
              { value: '', label: t('reviews.allInstitutes', 'Все институты') },
              ...facultyOptions.map((item) => ({ value: String(item.id), label: item.subtitle })),
            ]}
          />
          <SelectField
            label={t('reviews.level', 'Уровень')}
            value={level}
            onChange={setLevel}
            options={[
              { value: '', label: t('reviews.allLevels', 'Все уровни') },
              ...levelOptions.map((item) => ({ value: String(item.id), label: item.title })),
            ]}
          />
        </div>

        <FilterSummary
          text={
            isLoading
              ? ''
              : t('newsPage.found', { defaultValue: 'Найдено: {{count}}', count: filtered.length })
          }
          canReset={hasFilters}
          onReset={reset}
        />

        <div className="mt-6">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="py-20 text-center text-ink-soft">{t('loading.error')}</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl bg-gray-light px-6 py-16 text-center">
              <p className="text-xl font-semibold text-ink">
                {speakers.length === 0
                  ? t('reviews.empty', 'Отзывов пока нет')
                  : t('newsPage.emptyTitle', 'Ничего не найдено')}
              </p>
              {speakers.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-dark"
                >
                  {t('newsPage.reset', 'Сбросить фильтры')}
                </button>
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-5 gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {filtered.map((item) => (
                <li key={item.id}>
                  <SpeakerVideo {...item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
