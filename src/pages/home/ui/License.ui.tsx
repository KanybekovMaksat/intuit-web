import Fancybox from './Fancybox'
import Gerb from '../../../assets/gerb.svg'
import { Typography } from '@mui/material'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'

export const License = () => {
  return (
    <div className=" mx-auto py-10 ">
      <Title>{t('homepage.License.documents')}</Title>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <div className="flex justify-between gap-4 lg:flex-col">
          <div className="max-w-md w-full border border-gray rounded-lg bg-white p-3 shadow hover:shadow-lg transition-shadow duration-300 min-h-[150px]">
            <div className="flex flex-col ">
              <h3 className="text-xl font-bold ">
                Официальные документы университета
              </h3>
              <p className="text-sm text-gray-600 mt-4">
                Лицензия на право ведения образовательной деятельности в сфере
                профессионального образования и свидетельство о государственной
                регистрации Международного Университета Инновационных
                Технологий.
              </p>
            </div>
          </div>
          <a
            data-fancybox="gallery"
            href="https://intuit.kg/documents/license.pdf"
            className="flex items-center border border-gray rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300 min-h-[150px]"
          >
            <div className="flex  items-center justify-center gap-3">
              <div className="w-24 h-24 ">
                <img src={Gerb} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('homepage.License.licenses')}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {t('homepage.License.viewDocument')}
                </p>
              </div>
            </div>
          </a>
          <a
            data-fancybox="gallery"
            href="https://intuit.kg/documents/Svidetelstvo.png"
            className="block border border-gray rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300 min-h-[150px]"
          >
            <div className="flex  items-center gap-3">
              <div className="w-24 h-24">
                <img src={Gerb} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('homepage.License.certificate')}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {t('homepage.License.viewDocument')}
                </p>
              </div>
            </div>
          </a>
        </div>
      </Fancybox>
    </div>
  )
}
