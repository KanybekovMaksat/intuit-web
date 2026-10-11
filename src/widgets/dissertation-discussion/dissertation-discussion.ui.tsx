import { ChangeEvent, useEffect, useState } from 'react'
import { Button, InputAdornment, MenuItem, Pagination, TextField, useMediaQuery, useTheme } from '@mui/material'
import { Search, X } from 'lucide-react'
import { DissertationCard, dissertationQueries, dissertationTypes } from '~entities/dissertation'
import { Loader } from '~shared/ui/loader'
import { Title } from '~shared/ui/title'
import { DiscussionUserPanel } from './user-panel.ui'

const PAGE_SIZE = 9

const fieldSx = {
  backgroundColor: '#FFFFFF',
  borderRadius: '999px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '999px',
    fontSize: '14px',
    '& fieldset': { borderColor: '#E1E3EE' },
    '&:hover fieldset': { borderColor: '#2A2172' },
    '&.Mui-focused fieldset': { borderColor: '#2A2172', borderWidth: '1px' },
  },
}

const initialFilters: dissertationTypes.DissertationFilters = {
  page: 1,
  search: '',
  discussionStatus: '',
  specialty: '',
}

export const DissertationDiscussion = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [filters, setFilters] = useState(initialFilters)
  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading, isError, isFetching } = dissertationQueries.useDissertations(filters)
  const { data: specialties = [] } = dissertationQueries.useSpecialties()

  // Поиск на сервере — с небольшой задержкой после ввода
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) =>
        prev.search === searchInput.trim() ? prev : { ...prev, search: searchInput.trim(), page: 1 }
      )
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  const updateFilter = (patch: Partial<dissertationTypes.DissertationFilters>) =>
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }))

  const resetFilters = () => {
    setSearchInput('')
    setFilters(initialFilters)
  }

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0

  return (
    <section id="dissertations" className="my-14 rounded-3xl bg-gray-light px-8 py-12 sm:px-4 sm:py-8">
      <div className="w-full">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold text-green-dark">Высшая школа докторантуры</p>
          <Title className="!m-0 !text-left !text-4xl !font-semibold !leading-tight md:!text-3xl">
            Общественное обсуждение диссертаций
          </Title>
          <p className="mt-4 max-w-[760px] text-base text-ink-soft">
            Ознакомьтесь с диссертациями докторантов и задайте вопросы по исследованию. Ответы
            докторантов публикуются открыто и доступны всем посетителям.
          </p>
        </div>

        <DiscussionUserPanel />

        <div className="mb-8 rounded-3xl border border-line bg-white p-4">
          <div className="grid grid-cols-[2fr_1fr_1fr_auto] items-center gap-4 lg:grid-cols-1">
            <TextField
              fullWidth
              placeholder="Поиск по теме, ФИО, специальности"
              value={searchInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchInput(event.target.value)}
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} className="text-ink-soft" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              fullWidth
              label="Статус"
              value={filters.discussionStatus}
              onChange={(event) =>
                updateFilter({
                  discussionStatus: event.target.value as dissertationTypes.DiscussionStatus | '',
                })
              }
              sx={fieldSx}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="open">Обсуждение открыто</MenuItem>
              <MenuItem value="finished">Обсуждение завершено</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Специальность"
              value={filters.specialty}
              onChange={(event) =>
                updateFilter({ specialty: event.target.value })
              }
              sx={fieldSx}
            >
              <MenuItem value="">Все специальности</MenuItem>
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              className="h-14 min-w-14 rounded-full border-line bg-white px-0 text-primary shadow-none hover:border-primary hover:bg-gray-light"
              onClick={resetFilters}
              title="Сбросить фильтры"
              aria-label="Сбросить фильтры"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="rounded-3xl border border-line bg-white p-8 text-center text-ink-soft">
            Не удалось загрузить диссертации. Попробуйте обновить страницу.
          </div>
        ) : (
          <div
            className={`grid grid-cols-3 gap-6 xll:grid-cols-2 md:grid-cols-1 transition-opacity ${
              isFetching ? 'opacity-60' : ''
            }`}
          >
            {data?.results.length ? (
              data.results.map((dissertation) => (
                <DissertationCard key={dissertation.id} dissertation={dissertation} />
              ))
            ) : (
              <div className="col-span-3 rounded-3xl border border-line bg-white p-8 text-center text-ink-soft xll:col-span-2 md:col-span-1">
                Диссертации не найдены
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center w-full overflow-x-auto py-1">
            <Pagination
              count={totalPages}
              page={filters.page}
              onChange={(_event, page) => setFilters((prev) => ({ ...prev, page }))}
              size={isMobile ? 'small' : 'medium'}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={1}
              sx={{
                '& .MuiPagination-ul': {
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                },
                '& .MuiPaginationItem-root': { color: '#2A2172' },
                '& .MuiPaginationItem-root.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#2A2172',
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
