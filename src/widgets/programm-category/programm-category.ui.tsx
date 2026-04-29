import { Button, InputAdornment, Pagination, TextField } from '@mui/material'
import Select, { SingleValue, StylesConfig } from 'react-select'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import { degreeQueries } from '~entities/degree'
import { facultyQueries } from '~entities/faculties'
import { programQueries } from '~entities/programs'
import { ProfessionCard } from '~entities/profession'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { Title } from '~shared/ui/title'

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
  const professions = getApiList<ProgramItem>((propdata || serverData)?.data)

  const filteredProfessions = professions.filter((profession) => {
    const educationLevels = profession.educationLevel || []
    const faculties = profession.faculty || []
    const normalizedSearch = searchQuery.trim().toLowerCase()

    const matchesDegree = selectedDegree
      ? educationLevels.some((level) => getRelationId(level) === selectedDegree)
      : true
    const matchesFaculty = selectedFaculty
      ? faculties.some((faculty) => getRelationId(faculty) === selectedFaculty)
      : true
    const matchesSearch = normalizedSearch
      ? profession.title.toLowerCase().includes(normalizedSearch)
      : true

    return matchesDegree && matchesFaculty && matchesSearch
  })

  const totalPages = Math.ceil(
    filteredProfessions.length / itemsPerPage
  )
  const paginatedProfessions = filteredProfessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDegreeChange = (selectedOption: SingleValue<Option>) => {
    setSelectedDegree(selectedOption?.value || null)
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
  }

  const customSelectStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: 'rgba(42, 33, 114, 0.14)',
      borderRadius: '8px',
      boxShadow: 'none',
      fontSize: '14px',
      fontWeight: 600,
      minHeight: '48px',
      padding: '2px 6px',
      '&:hover': {
        borderColor: '#00956F',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(42, 33, 114, 0.55)',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(42, 33, 114, 0.1)',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#2A2172'
        : state.isFocused
          ? 'rgba(0, 149, 111, 0.08)'
          : '#FFFFFF',
      color: state.isSelected ? '#FFFFFF' : '#2A2172',
    }),
  }

  if (isError || isFacultyError || isDegreeError) {
    return <div>{t('loading.error')}</div>
  }

  if (isLoading || isDegreeLoading || isFacultyLoading) {
    return <Loader />
  }

  return (
    <section className="py-20 bg-gray-light">
      <div className="container mx-auto">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-primary/10 pb-6 md:flex-col md:items-start">
          <div>
            <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-green">
              <span className="h-px w-8 bg-green" />
              {t('homepage.degrees.academicPrograms', {
                defaultValue: t('homepage.degrees.degreeCategory'),
              })}
            </div>
            <Title className="!m-0 !text-left !text-4xl !font-semibold !leading-tight !text-primary md:!text-3xl">
              {t('homepage.degrees.programs')}
            </Title>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-primary/10 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 lg:grid-cols-1">
            <Select
              options={sortedDegrees}
              styles={customSelectStyles}
              placeholder={t('homepage.degrees.selectDegreePlaceholder')}
              className="z-50"
              onChange={handleDegreeChange}
              menuPortalTarget={
                typeof document !== 'undefined' ? document.body : undefined
              }
              value={
                sortedDegrees.find(
                  (degree) => degree.value === selectedDegree
                ) || null
              }
            />

            <Select
              options={sortedFaculties}
              styles={customSelectStyles}
              placeholder={t('homepage.degrees.selectDirectionPlaceholder')}
              className="z-50"
              onChange={handleFacultyChange}
              menuPortalTarget={
                typeof document !== 'undefined' ? document.body : undefined
              }
              value={
                sortedFaculties.find(
                  (faculty) => faculty.value === selectedFaculty
                ) || null
              }
            />

            <Button
              variant="outlined"
              className="h-12 min-w-12 rounded-lg border-primary/15 bg-white px-0 text-primary shadow-none hover:border-green hover:bg-green/5"
              onClick={handleClearFilters}
              title="Сбросить фильтры"
              aria-label="Сбросить фильтры"
            >
              <X size={18} />
            </Button>
          </div>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск по названию программы"
            value={searchQuery}
            onChange={handleSearchChange}
            className="mt-4"
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px',
                '& fieldset': {
                  borderColor: 'rgba(42, 33, 114, 0.14)',
                },
                '&:hover fieldset': {
                  borderColor: '#00956F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00956F',
                  borderWidth: '1px',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} className="text-primary/60" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-6 xl:grid-cols-3 xll:grid-cols-2 md:grid-cols-1">
          {paginatedProfessions?.length ? (
            paginatedProfessions.map((profession, index) => (
              <ProfessionCard
                key={profession.slug || profession.id || index}
                degree={getRelationLabel(
                  profession.educationLevel?.[0],
                  sortedDegrees
                )}
                faculties={getRelationLabel(
                  profession.faculty?.[0],
                  sortedFaculties
                )}
                title={profession.title}
                url={profession.slug}
                icon={getRelationIcon(profession.faculty?.[0])}
                index={(currentPage - 1) * itemsPerPage + index}
              />
            ))
          ) : (
            <div className="col-span-4 rounded-lg border border-primary/10 bg-white p-8 text-center text-primary/70 md:col-span-1">
              Программы не найдены
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#2A2172',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#00956F',
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
