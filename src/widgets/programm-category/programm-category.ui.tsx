import { Button, Pagination, TextField, InputAdornment } from '@mui/material'
import Select from 'react-select'
import { ProfessionCard } from '~entities/profession'
import { useTranslation } from 'react-i18next'
import { programQueries } from '~entities/programs'
import { facultyQueries } from '~entities/faculties'
import { degreeQueries } from '~entities/degree'
import { useState } from 'react'
import { FacultySchema } from '~entities/faculties/faculty.types'
import { SearchCheck } from 'lucide-react'
import { Title } from '~shared/ui/title'
import { Loader } from '~shared/ui/loader'

export const ProgramCategory = ({ data: propdata, degreeId, facultyId }) => {
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

  const sortedFaculties =
    facultyData?.data
      .sort((a, b) => a.id - b.id)
      .map((faculty) => ({
        value: faculty.id,
        label: faculty.subtitle || faculty.subtitle,
      })) || []

  const sortedDegrees =
    degreeData?.data
      .sort((a, b) => a.id - b.id)
      .map((degree) => ({
        value: degree.id,
        label: degree.titleRu || degree.title,
      })) || []

  const [selectedDegree, setSelectedDegree] = useState(degreeId || null)
  const [selectedFaculty, setSelectedFaculty] = useState(facultyId || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 8

  const professions = propdata || serverData

  const filteredProfessions = professions?.data.filter((profession) => {
    const matchesDegree = selectedDegree
      ? profession.educationLevel.some((level) => level.id === selectedDegree)
      : true
    const matchesFaculty = selectedFaculty
      ? profession.faculty.some((faculty) => faculty.id === selectedFaculty)
      : true
    const matchesSearch = profession.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesDegree && matchesFaculty && matchesSearch
  })

  const totalPages = Math.ceil(
    (filteredProfessions?.length || 0) / itemsPerPage
  )
  const paginatedProfessions = filteredProfessions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDegreeChange = (selectedOption) => {
    setSelectedDegree(selectedOption?.value || null)
    setCurrentPage(1)
  }

  const handleFacultyChange = (selectedOption) => {
    setSelectedFaculty(selectedOption?.value || null)
    setCurrentPage(1)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedDegree(null)
    setSelectedFaculty(null)
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '10px',
      borderColor: '#ccc',
      boxShadow: 'none',
      padding: '2px 4px',
      minHeight: '42px',
      '&:hover': {
        borderColor: '#888',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // чтобы само меню было поверх
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // чтобы портал был поверх всех блоков
    }),
  }

  if (isError || isFacultyError || isDegreeError) {
    return <div>{t('loading.error')}</div>
  }

  if (isLoading || isDegreeLoading || isFacultyLoading) {
    return <Loader />
  }

  return (
    <div className="my-20 rounded-lg ">
      <Title>{t('homepage.degrees.programs')}</Title>
      <div className="my-5 flex flex-col gap-5">
        <div className="flex flex-wrap gap-4 items-stretch justify-between md:flex-col">
          <div className="flex-1 min-w-[250px]">
            <Select
              options={sortedDegrees}
              styles={customSelectStyles}
              placeholder="Выберите уровень"
              className="z-50"
              onChange={handleDegreeChange}
              menuPortalTarget={document.body}
              value={
                sortedDegrees.find(
                  (degree) => degree.value === selectedDegree
                ) || null
              }
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <Select
              options={sortedFaculties}
              styles={customSelectStyles}
              placeholder="Выберите направление"
              className="z-50"
              onChange={handleFacultyChange}
              value={
                sortedFaculties.find(
                  (faculty: FacultySchema) => faculty.value === selectedFaculty
                ) || null
              }
            />
          </div>
          <div className="min-w-[200px] flex items-center">
            <Button
              variant="outlined"
              className="shadow-none border-blue hover:border-blue bg-blue text-white px-6 w-full"
              onClick={handleClearFilters}
            >
              Применить
            </Button>
          </div>
        </div>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по названию программы"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#999',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00956F',
                borderWidth: '2px',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchCheck />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="grid grid-cols-4 justify-items-center mt-10 md:grid-cols-1 gap-6 lg:grid-cols-2 xll:grid-cols-2 xl:grid-cols-3">
        {paginatedProfessions?.map((profession, index) => (
          <ProfessionCard
            key={index}
            degree={profession.educationLevel[0].title}
            faculties={profession.faculty[0].subtitle}
            title={profession.title}
            url={profession.slug}
            icon={profession.faculty[0].icon}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                color: 'white',
                backgroundColor: '#00956F',
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
