import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Stats } from './Stats.ui'
import { Title } from '~shared/ui/title'

export const AboutBlock = () => {
  const { t } = useTranslation()

  return (
    <section className=" bg-gradient-to-b from-white to-gray-50 rounded-2xl ">
      <Title>{t('homepage.aboutUniversity.title')}</Title>

      <div className="flex justify-between md:flex-col-reverse gap-8 ">
        <div className="w-1/2 md:w-full bg-white rounded-2xl shadow-none ">
          <div className="flex items-center gap-2 mb-4">
            <Typography variant="h5" className="text-blue-600 font-bold">
              {t('homepage.aboutUniversity.goal')}
            </Typography>
          </div>
          <Typography variant="body1" className="text-gray-700 leading-relaxed">
            {t('homepage.aboutUniversity.description')}
          </Typography>
        </div>

        <div className="w-1/2 md:w-full">
          <div className="aspect-video   md:h-[200px] overflow-hidden rounded-2xl  shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/diIcqVN1Dag?si=0HPGrFl0BrTQEhn0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Stats />
    </section>
  )
}
