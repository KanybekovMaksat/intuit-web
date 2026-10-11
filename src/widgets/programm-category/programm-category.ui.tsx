import { Pagination, useMediaQuery, useTheme } from '@mui/material'
import Select, { SingleValue, StylesConfig } from 'react-select'
import { ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RotateCcw, Search, SearchX, X } from 'lucide-react'
import { degreeQueries } from '~entities/degree'
import { facultyQueries } from '~entities/faculties'
import { programQueries } from '~entities/programs'
import { ProfessionCard } from '~entities/profession'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { SectionHeader } from '~shared/ui/title'

type Option = {
  value: number
  label: string
}

type RelationItem =
  | number
  | {
      id: number
      title?: string
      titleRu?: string
      subtitle?: string
      icon?: string
    }

type SelectSourceItem = {
  id: number
  title: string
  titleRu?: string
  subtitle?: string
  icon?: string
}

type ProgramItem = {
  id?: number
  title: string
  slug: string
  educationLevel?: RelationItem[]
  faculty?: RelationItem[]
}

type ProgramCategoryData = {
  data?: unknown
}

interface ProgramCategoryProps {
  data?: ProgramCategoryData
  degreeId?: number
  facultyId?: number
}

const getRelationId = (relation: RelationItem) =>
  typeof relation === 'number' ? relation : relation.id

const getRelationLabel = (
  relation: RelationItem | undefined,
  options: Option[],
  fallback = ''
) => {
  if (!relation) return fallback
  if (typeof relation === 'number') {
    return options.find((option) => option.value === relation)?.label || fallback
  }

  return relation.titleRu || relation.subtitle || relation.title || fallback
}

const getRelationIcon = (relation: RelationItem | undefined) => {
  if (!relation || typeof relation === 'number') return undefined
  return relation.icon
}

export const ProgramCategory = ({
  data: propdata,
  degreeId,
  facultyId,
}: ProgramCategoryProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    data: serverData,
    isLoading,
    isError,
  } = programQueries.useGetPrograms(degreeId, facultyId)
  const {
    data: facultyData,
    isLoading: isFacultyLoading,
    isError: isFacultyError,
  } = facultyQueries.useGetFaculties()
  const {
    data: degreeData,
    isLoading: isDegreeLoading,
    isError: isDegreeError,
  } = degreeQueries.useGetDegrees()

  const sortedFaculties: Option[] = getApiList<SelectSourceItem>(facultyData?.data)
    .sort((a, b) => a.id - b.id)
    .map((faculty) => ({
      value: faculty.id,
      label: faculty.subtitle || faculty.title,
    }))

  const sortedDegrees: Option[] = getApiList<SelectSourceItem>(degreeData?.data)
    .sort((a, b) => a.id - b.id)
    .map((degree) => ({
      value: degree.id,
      label: degree.titleRu || degree.title,
    }))

  const [selectedDegree, setSelectedDegree] = useState<number | null>(
    degreeId || null
  )
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(
    facultyId || null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 8
  const listRef = useRef<HTMLDivElement>(null)
  const professions = getApiList<ProgramItem>((propdata || serverData)?.data)
  const normalizedSearch = searchQuery.trim().toLowerCase()

  const matchesProgram = (
    profession: ProgramItem,
    degree: number | null,
    faculty: number | null
  ) => {
    const matchesDegree = degree
      ? (profession.educationLevel || []).some((level) => getRelationId(level) === degree)
      : true
    const matchesFaculty = faculty
      ? (profession.faculty || []).some((item) => getRelationId(item) === faculty)
      : true
    const matchesSearch = normalizedSearch
      ? profession.title.toLowerCase().includes(normalizedSearch)
      : true
    return matchesDegree && matchesFaculty && matchesSearch
  }

  const filteredProfessions = professions.filter((profession) =>
    matchesProgram(profession, selectedDegree, selectedFaculty)
  )

  // Counts and options react to the other active filters, so a choice never leads to an empty list
  const degreeCounts = new Map<number, number>()
  sortedDegrees.forEach((degree) => {
    degreeCounts.set(
      degree.value,
      professions.filter((item) => matchesProgram(item, degree.value, selectedFaculty)).length
    )
  })
  const allCount = professions.filter((item) => matchesProgram(item, null, selectedFaculty)).length

  const availableFaculties = sortedFaculties.filter(
    (faculty) =>
      faculty.value === selectedFaculty ||
      professions.some((item) => matchesProgram(item, selectedDegree, faculty.value))
  )

  const totalPages = Math.ceil(filteredProfessions.length / itemsPerPage)
  const paginatedProfessions = filteredProfessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const hasActiveFilters =
    selectedDegree !== (degreeId || null) ||
    selectedFaculty !== (facultyId || null) ||
    normalizedSearch !== ''

  const handleDegreeChange = (value: number | null) => {
    setSelectedDegree(value)
    setCurrentPage(1)
  }

  const handleFacultyChange = (selectedOption: SingleValue<Option>) => {
    setSelectedFaculty(selectedOption?.value || null)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedDegree(degreeId || null)
    setSelectedFaculty(facultyId || null)
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const customSelectStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#2A2172' : '#E1E3EE',
      borderRadius: '9999px',
      boxShadow: 'none',
      fontSize: '14px',
      fontWeight: 500,
      minHeight: '48px',
      padding: '0 8px',
      cursor: 'pointer',
      '&:hover': { borderColor: '#2A2172' },
    }),
    placeholder: (provided) => ({ ...provided, color: '#4B4D6B' }),
    singleValue: (provided) => ({ ...provided, color: '#14123A' }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #E1E3EE',
      boxShadow: '0 16px 40px -12px rgba(42, 33, 114, 0.25)',
      zIndex: 9999,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#2A2172' : state.isFocused ? '#EEF0F7' : '#FFFFFF',
      color: state.isSelected ? '#FFFFFF' : '#14123A',
    }),
  }

  if (isError || isFacultyError || isDegreeError) {
    return <div>{t('loading.error')}</div>
  }

  if (isLoading || isDegreeLoading || isFacultyLoading) {
    return <Loader />
  }

  const showDegreeTabs = !degreeId && sortedDegrees.length > 0
  const showFacultySelect = !facultyId

  const tabClass = (active: boolean) =>
    `inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors ${
      active
        ? 'border-primary bg-primary text-white'
        : 'border-line bg-white text-ink hover:border-primary/40'
    }`

  const searchPlaceholder = t('homepage.degrees.searchPlaceholder', 'Поиск по названию программы')
  const resetLabel = t('homepage.degrees.reset', 'Сбросить фильтры')

  return (
    <section className="my-12 rounded-3xl bg-gray-light px-10 py-12 xll:px-8 sm:my-8 sm:rounded-2xl sm:px-4 sm:py-8">
      <div className="w-full">
        <SectionHeader title={t('homepage.degrees.programs')} />

        {showDegreeTabs && (
          <div
            role="tablist"
            aria-label={t('homepage.degrees.selectDegreePlaceholder')}
            className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedDegree === null}
              onClick={() => handleDegreeChange(null)}
              className={tabClass(selectedDegree === null)}
            >
              {t('homepage.degrees.all', 'Все')}
              <span className={selectedDegree === null ? 'text-white/70' : 'text-ink-soft'}>
                {allCount}
              </span>
            </button>
            {sortedDegrees.map((degree) => {
              const active = selectedDegree === degree.value
              const count = degreeCounts.get(degree.value) || 0
              return (
                <button
                  key={degree.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={count === 0 && !active}
                  onClick={() => handleDegreeChange(degree.value)}
                  className={`${tabClass(active)} disabled:cursor-not-allowed disabled:opacity-45`}
                >
                  {degree.label}
                  <span className={active ? 'text-white/70' : 'text-ink-soft'}>{count}</span>
                </button>
              )
            })}
          </div>
        )}

        <div
          className={`grid gap-3 lg:grid-cols-1 ${
            showFacultySelect ? 'grid-cols-[minmax(0,1fr)_minmax(0,360px)]' : 'grid-cols-1'
          }`}
        >
          <label className="relative block">
            <span className="sr-only">{searchPlaceholder}</span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
            />
          </label>

          {showFacultySelect && (
            <Select
              options={availableFaculties}
              styles={customSelectStyles}
              isClearable
              placeholder={t('homepage.degrees.selectDirectionPlaceholder')}
              aria-label={t('homepage.degrees.selectDirectionPlaceholder')}
              noOptionsMessage={() => t('homepage.degrees.noResults', 'Ничего не найдено')}
              onChange={handleFacultyChange}
              menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
              value={sortedFaculties.find((faculty) => faculty.value === selectedFaculty) || null}
            />
          )}
        </div>

        <div
          ref={listRef}
          className="mb-6 mt-5 flex min-h-[36px] scroll-mt-24 items-center justify-between gap-4"
        >
          <p className="text-sm text-ink-soft" aria-live="polite">
            {t('homepage.degrees.found', {
              defaultValue: 'Найдено программ: {{count}}',
              count: filteredProfessions.length,
            })}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-primary transition-colors hover:bg-white"
            >
              <RotateCcw size={15} />
              {resetLabel}
            </button>
          )}
        </div>

        {paginatedProfessions.length ? (
          <div className="grid grid-cols-4 gap-6 xl:grid-cols-3 xll:grid-cols-2 md:grid-cols-1">
            {paginatedProfessions.map((profession, index) => (
              <ProfessionCard
                key={profession.slug || profession.id || index}
                degree={getRelationLabel(profession.educationLevel?.[0], sortedDegrees)}
                faculties={getRelationLabel(profession.faculty?.[0], sortedFaculties)}
                title={profession.title}
                url={profession.slug}
                icon={getRelationIcon(profession.faculty?.[0])}
                index={(currentPage - 1) * itemsPerPage + index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-6 py-14 text-center">
            <SearchX size={32} className="text-ink-soft" />
            <p className="text-lg font-semibold text-ink">
              {t('homepage.degrees.emptyTitle', 'Программы не найдены')}
            </p>
            <p className="max-w-[40ch] text-sm text-ink-soft">
              {t(
                'homepage.degrees.emptyHint',
                'Измените запрос или сбросьте фильтры, чтобы увидеть все программы.'
              )}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                <X size={16} />
                {resetLabel}
              </button>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex w-full justify-center overflow-x-auto py-1">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size={isMobile ? 'small' : 'medium'}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={1}
              sx={{
                '& .MuiPagination-ul': { flexWrap: 'nowrap', justifyContent: 'center' },
                '& .MuiPaginationItem-root': {
                  color: '#14123A',
                  minWidth: isMobile ? '28px' : '36px',
                  height: isMobile ? '28px' : '36px',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: 600,
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#2A2172 !important',
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
