import { Button, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Gerb from '../../assets/gerb.svg'
import EGerb from '../../assets/eugerb.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Fancybox from '~widgets/diplom-list/Fancybox'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Title } from '~shared/ui/title'

export const DiplomList = () => {
  const { t } = useTranslation()

  return (
    <div className="my-10">
      <Title>{t('homepage.diploma.yourFutureDiploma')}</Title>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <Swiper
          className="py-10 px-1 diplom-list"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <a
              data-fancybox="gallery"
              href="https://intuit.kg/documents/bakalavr.pdf"
            >
              <Card className="group transition duration-300 max-w-[420px] w-full bg-white p-5 sm:p-3.5 flex gap-5 sm:gap-2.5 rounded-2xl border border-line hover:border-primary/40 min-h-[190px]">
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <Typography
                      variant="h4"
                      className="font-bold text-[20px] leading-8 text-ink group-hover:text-primary"
                    >
                      {t('homepage.diploma.bachelor.degree')}
                    </Typography>
                    <Typography className="mt-2 text-ink-soft text-[15px] ">
                      {t('homepage.diploma.bachelor.description')}
                    </Typography>
                  </div>

                  <Button className="self-start mt-3 shadow-none bg-primary text-white !rounded-full px-5 py-1.5 font-semibold normal-case hover:bg-ink">
                    {t('homepage.diploma.buttonText')}
                  </Button>
                </div>

                <img
                  src={Gerb}
                  alt="Diploma Icon"
                  className="w-[100px] sm:w-[70px] self-center flex-shrink-0 transition duration-300 group-hover:scale-105"
                />
              </Card>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              data-fancybox="gallery-2"
              href="https://intuit.kg/documents/diploms/magistratura.pdf"
            >
              <Card className="group transition duration-300 max-w-[420px] w-full bg-white p-5 sm:p-3.5 flex gap-5 sm:gap-2.5 rounded-2xl border border-line hover:border-primary/40 min-h-[190px]">
                <div className="flex flex-col justify-between text-left">
                  <div>
                    <Typography
                      variant="h4"
                      className="font-semibold text-[20px] leading-8"
                    >
                      {t('homepage.diploma.master.degree')}
                    </Typography>
                    <Typography className="mt-2 text-ink-soft text-[15px] ">
                      {t('homepage.diploma.master.description')}
                    </Typography>
                  </div>
                  <Button className="self-start mt-3 shadow-none bg-primary text-white !rounded-full px-5 py-1.5 font-semibold normal-case hover:bg-ink">
                    {t('homepage.diploma.buttonText')}
                  </Button>
                </div>
                <img
                  src={Gerb}
                  alt="Diploma Icon"
                  className="w-[100px] sm:w-[70px] self-center flex-shrink-0 transition duration-300 group-hover:scale-105"
                />
              </Card>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              data-fancybox="gallery-3"
              href="https://intuit.kg/documents/diploms/magistratura.pdf"
            >
              <Card className="group transition duration-300 max-w-[420px] w-full bg-white p-5 sm:p-3.5 flex gap-5 sm:gap-2.5 rounded-2xl border border-line hover:border-primary/40 min-h-[190px]">
                <div className="flex flex-col justify-between text-left">
                  <div>
                    <Typography
                      variant="h4"
                      className="font-semibold text-[20px] leading-8"
                    >
                      {t('homepage.diploma.postgraduate.degree')}
                    </Typography>
                    <Typography className="mt-2 text-ink-soft text-[15px] ">
                      {t('homepage.diploma.postgraduate.description')}
                    </Typography>
                  </div>
                  <Button className="self-start mt-3 shadow-none bg-primary text-white !rounded-full px-5 py-1.5 font-semibold normal-case hover:bg-ink">
                    {t('homepage.diploma.buttonText')}
                  </Button>
                </div>
                <img
                  src={Gerb}
                  alt="Diploma Icon"
                  className="w-[100px] sm:w-[70px] self-center flex-shrink-0 transition duration-300 group-hover:scale-105"
                />
              </Card>
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a
              data-fancybox="gallery-4"
              href="https://intuit.kg/documents/diploms/diplom_en.pdf"
            >
              <Card className="group transition duration-300 max-w-[420px] w-full bg-white p-5 sm:p-3.5 flex gap-5 sm:gap-2.5 rounded-2xl border border-line hover:border-primary/40 min-h-[190px]">
                <div className="flex flex-col justify-between items-center text-left">
                  <div>
                    <Typography
                      variant="h4"
                      className="font-semibold text-[18px] leading-5"
                    >
                      {t('homepage.diploma.diplomaSupplement.title')}
                    </Typography>
                    <Typography className="mt-2 text-ink-soft text-[15px] ">
                      {t('homepage.diploma.diplomaSupplement.description')}
                    </Typography>
                  </div>
                  <Button
                    className="self-start mt-3 shadow-none bg-primary text-white !rounded-full px-5 py-1.5 font-semibold normal-case hover:bg-ink"
                  >
                    {t('homepage.diploma.buttonText')}
                  </Button>
                </div>
                <img
                  src={EGerb}
                  alt="Diploma Icon"
                  className="w-[100px] sm:w-[70px] self-center flex-shrink-0 transition duration-300 group-hover:scale-105"
                />
              </Card>
            </a>
          </SwiperSlide>
        </Swiper>
      </Fancybox>
    </div>
  )
}

export default DiplomList
