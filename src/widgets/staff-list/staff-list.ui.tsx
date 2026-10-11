import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StaffCard, staffQueries } from '~entities/staff'
import { Staff } from '~entities/staff/staff.types'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'

const PREVIEW_COUNT = 6

const StaffList = () => {
  const { t } = useTranslation()
  const [selectedPosition, setSelectedPosition] = useState<number | null>(29)
  const [showAll, setShowAll] = useState(false)

  const {
    data: staffData,
    isError: isStaffError,
    isLoading: isStaffLoading,
  } = staffQueries.useGetStaffs()

  const {
    data: positionsData,
    isSuccess: isPositionsSuccess,
    isError: isPositionsError,
    isLoading: isPositionsLoading,
  } = staffQueries.useGetStaffPositions()

  if (isStaffLoading || isPositionsLoading) {
    return <Loader />
  }

  if (isStaffError || isPositionsError) {
    return <Loader />
  }

  const staffs = getApiList<Staff>(staffData?.data)
  const positions = getApiList<{ id: number; title: string; level: number }>(
    positionsData?.data
  )

  const filterData = staffs
    .filter((staff: Staff) => staff.position.id === selectedPosition)
    .sort((a, b) => {
      if (a.id === 35) return -1
      if (b.id === 35) return 1
      return 0
    })

  return (
    <>
      {isPositionsSuccess && (
        <div
          role="tablist"
          aria-label="position navigation"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {positions.map((position: { id: number; title: string; level: number }) => (
            <button
              key={position.id}
              type="button"
              role="tab"
              aria-selected={selectedPosition === position.id}
              onClick={() => {
                setSelectedPosition(position.id)
                setShowAll(false)
              }}
              className={`h-10 shrink-0 whitespace-nowrap rounded-full border px-5 text-sm font-semibold transition-colors ${
                selectedPosition === position.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-white text-ink hover:border-primary/40'
              }`}
            >
              {position.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-3 gap-5 xll:grid-cols-2 md:grid-cols-1">
        {(showAll ? filterData : filterData.slice(0, PREVIEW_COUNT)).map((staff: Staff) => (
          <StaffCard key={staff.id} {...staff} />
        ))}
      </div>

      {filterData.length > PREVIEW_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="h-12 rounded-full border border-line bg-white px-6 text-[15px] font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            {showAll
              ? t('homepage.staff.collapse', 'Свернуть')
              : t('homepage.staff.showAll', {
                  defaultValue: 'Показать всех ({{count}})',
                  count: filterData.length,
                })}
          </button>
        </div>
      )}
    </>
  )
}

export default StaffList
