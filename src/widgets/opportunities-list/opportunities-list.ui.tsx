import { Card, Typography } from '@mui/material'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import { useTranslation } from 'react-i18next' // импортируем хук
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Title } from '~shared/ui/title'

export const OpportunitiesList = () => {
  const { t } = useTranslation() // инициализируем перевод

  return (
    <div className="my-10">
      <Title>{t('homepage.opportunities.title')}</Title>
      <div className="flex gap-5 justify-between mt-4 flex-wrap lg:gap-10 lg:justify-center md:hidden">
        <Card className=" rounded-md max-w-[350px] md:w-full p-5 shadow-green bg-[#f5f5f5] transition-all duration-200 ">
          <Typography
            variant="h6"
            component="div"
            className="leading-5 font-bold"
          >
            {t('homepage.opportunities.materials.title')}{' '}
            {/* Доступность учебных материалов */}
          </Typography>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.materials.moodle')}{' '}
              {/* Все материалы доступны в системе MOODLE. */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.materials.review')}{' '}
              {/* Повторяйте материал и конспектируйте в любое время. */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.materials.keepUp')}{' '}
              {/* Догоняйте сокурсников и будьте в курсе. */}
            </li>
          </ul>
        </Card>
        <Card className=" rounded-md max-w-[350px] md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
          <Typography
            variant="h6"
            component="div"
            className="leading-5 font-bold"
          >
            {t('homepage.opportunities.transfer.title')}{' '}
            {/* Перевод из другого вуза */}
          </Typography>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.transfer.contact')}{' '}
              {/* Обратитесь в приемную комиссию */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.transfer.documents')}{' '}
              {/* Предоставьте пакет документов */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.transfer.assistance')}{' '}
              {/* Наши сотрудники готовы ответить на все ваши вопросы и оказать содействие в переводе */}
            </li>
          </ul>
        </Card>
        <Card className=" rounded-md max-w-[350px] md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
          <Typography
            variant="h6"
            component="div"
            className="leading-5 font-bold"
          >
            {t('homepage.opportunities.payment.title')}{' '}
            {/* Оплата обучения онлайн */}
          </Typography>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.payment.onlineCheck')}{' '}
              {/* Онлайн проверка оплаты */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.payment.mobileApps')}{' '}
              {/* Оплата по мобильным приложениям */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.payment.monthly')}{' '}
              {/* Удобная, в т.ч. помесячная оплата по личному шифру */}
            </li>
          </ul>
        </Card>
        <Card className=" rounded-md max-w-[350px] md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
          <Typography
            variant="h6"
            component="div"
            className="leading-5 font-bold"
          >
            {t('homepage.opportunities.career.title')}{' '}
            {/* Трудоустройство и карьера */}
          </Typography>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.career.resumeHelp')}{' '}
              {/* Поможем составить резюме */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.career.interviewPrep')}{' '}
              {/* Подготовят к собеседованию */}
            </li>
            <li>
              <BoltRoundedIcon className="text-green" />
              {t('homepage.opportunities.career.referenceLetter')}{' '}
              {/* Напишем рекомендательное письмо */}
            </li>
          </ul>
        </Card>
      </div>
      <div className="hidden lg:block">
        <Swiper
          className="py-10 px-1 diplom-list"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={10}
        >
          <SwiperSlide>
            <Card className=" rounded-md max-w-[350px] md:min-h-[250px] md:max-h-[250px] md:max-w-full md:min-w-full md:w-full p-5 shadow-green bg-[#f5f5f5] transition-all duration-200 ">
              <Typography
                variant="h6"
                component="div"
                className="leading-5 font-bold"
              >
                {t('homepage.opportunities.materials.title')}{' '}
                {/* Доступность учебных материалов */}
              </Typography>
              <ul className="mt-4 flex flex-col items-left gap-2">
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.materials.moodle')}{' '}
                  {/* Все материалы доступны в системе MOODLE. */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.materials.review')}{' '}
                  {/* Повторяйте материал и конспектируйте в любое время. */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.materials.keepUp')}{' '}
                  {/* Догоняйте сокурсников и будьте в курсе. */}
                </li>
              </ul>
            </Card>
          </SwiperSlide>

          <SwiperSlide>
            <Card className=" rounded-md max-w-[350px] md:min-h-[250px] md:max-h-[250px] md:max-w-full md:min-w-full md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
              <Typography
                variant="h6"
                component="div"
                className="leading-5 font-bold"
              >
                {t('homepage.opportunities.transfer.title')}{' '}
                {/* Перевод из другого вуза */}
              </Typography>
              <ul className="mt-4 flex flex-col items-left gap-2">
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.transfer.contact')}{' '}
                  {/* Обратитесь в приемную комиссию */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.transfer.documents')}{' '}
                  {/* Предоставьте пакет документов */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.transfer.assistance')}{' '}
                  {/* Наши сотрудники готовы ответить на все ваши вопросы и оказать содействие в переводе */}
                </li>
              </ul>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className=" rounded-md max-w-[350px] md:min-h-[250px] md:max-h-[250px] md:max-w-full md:min-w-full md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
              <Typography
                variant="h6"
                component="div"
                className="leading-5 font-bold"
              >
                {t('homepage.opportunities.payment.title')}{' '}
                {/* Оплата обучения онлайн */}
              </Typography>
              <ul className="mt-4 flex flex-col items-left gap-2">
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.payment.onlineCheck')}{' '}
                  {/* Онлайн проверка оплаты */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.payment.mobileApps')}{' '}
                  {/* Оплата по мобильным приложениям */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.payment.monthly')}{' '}
                  {/* Удобная, в т.ч. помесячная оплата по личному шифру */}
                </li>
              </ul>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className=" rounded-md max-w-[350px] md:min-h-[250px] md:max-h-[250px] md:max-w-full md:min-w-full md:w-full p-5 shadow-green bg-[#f5f5f5]  transition-all duration-200">
              <Typography
                variant="h6"
                component="div"
                className="leading-5 font-bold"
              >
                {t('homepage.opportunities.career.title')}{' '}
                {/* Трудоустройство и карьера */}
              </Typography>
              <ul className="mt-4 flex flex-col items-left gap-2">
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.career.resumeHelp')}{' '}
                  {/* Поможем составить резюме */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.career.interviewPrep')}{' '}
                  {/* Подготовят к собеседованию */}
                </li>
                <li>
                  <BoltRoundedIcon className="text-green" />
                  {t('homepage.opportunities.career.referenceLetter')}{' '}
                  {/* Напишем рекомендательное письмо */}
                </li>
              </ul>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
