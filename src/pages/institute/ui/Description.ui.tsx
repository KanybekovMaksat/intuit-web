import React from 'react'
import { StaffCard, staffQueries } from '~entities/staff'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { Staff } from '~entities/staff/staff.types'

interface DescriptionCardProps {
  subtitle?: string
  text?: string
  subtext?: string
  id?: number
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ text, id }) => {
  const {
    data: staffData,
    isSuccess,
    isError,
    isLoading,
  } = staffQueries.useGetStaffs(id as number)
  const staffs = getApiList<Staff>(staffData?.data)
  const hasStaff = isSuccess && staffs.length > 0

  return (
    <section
      className={`grid items-start gap-8 lg:grid-cols-1 ${
        hasStaff || isLoading ? 'grid-cols-[minmax(0,1fr)_420px]' : 'grid-cols-1'
      }`}
    >
      <div>
        <Title>{t('descriptionPage.aboutInstitute')}</Title>
        <div className="prose-muit prose-wide" dangerouslySetInnerHTML={{ __html: text || '' }} />
      </div>

      {(isLoading || isError || hasStaff) && (
        <aside className="mt-14 rounded-3xl bg-gray-light p-6 sm:mt-6 sm:p-4 lg:mt-0">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            {t('descriptionPage.leadingTeachers')}
          </h2>

          {isLoading && <Loader />}
          {isError && (
            <p className="mt-4 text-ink-soft">{t('loading.dataNotLoaded', 'Не удалось загрузить данные')}</p>
          )}

          {hasStaff && (
            <Swiper
              className="staff-list !pb-10 pt-4"
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {staffs.map((staff) => (
                <SwiperSlide className="!bg-transparent" key={staff.id}>
                  <StaffCard {...staff} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </aside>
      )}
    </section>
  )
}

export default DescriptionCard
