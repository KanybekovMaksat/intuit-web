import React from 'react'
import { Typography } from '@mui/material'
import { StaffCard, staffQueries } from '~entities/staff'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'
import { Loader } from '~shared/ui/loader'

interface DescriptionCardProps {
  subtitle: string
  text: string
  subtext: string
  id: number
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ text, id }) => {
  const {
    data: staffData,
    isSuccess,
    isError,
    isLoading,
  } = staffQueries.useGetStaffs(id)

  return (
    <div className="my-2 md:flex md:flex-col md:items-center">
      {/* Блок с преподавателями (справа) */}
      <div className="w-[550px] bg-[#e0e1e5] p-5 rounded-xl float-right ml-5 lg:w-full items-center ">
        <Title>{t('descriptionPage.leadingTeachers')}</Title>

        <div className="flex justify-center ">
          {isLoading && <Loader />}
          {isError && <div>Произошла ошибка при загрузке данных.</div>}

          {isSuccess && staffData?.data?.length > 0 ? (
            <Swiper
              className="py-20 px-1 staff-list"
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {staffData.data.map((staff) => (
                <SwiperSlide className="flex justify-center" key={staff.id}>
                  <StaffCard {...staff} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            isSuccess && <div>Нет данных о преподавателях.</div>
          )}
        </div>
      </div>

      {/* Левый блок с текстом */}
      <div className="p-5 bg-white shadow-lg rounded-lg text-justify">
        <Title>{t('descriptionPage.aboutInstitute')}</Title>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>

      {/* Очистка обтекания, чтобы текст дальше шел на всю ширину */}
      <div className="clear-both"></div>
    </div>
  )
}

export default DescriptionCard
