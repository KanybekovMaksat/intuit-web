import { Button, IconButton } from '@mui/material'
import IntuitLogo from '../../assets/intuit-logo.png'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TelegramIcon from '@mui/icons-material/Telegram'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { degreeQueries } from '~entities/degree'
import { DegreeSchema } from '~entities/degree/degree.types'
import { getApiList } from '~shared/lib/api/getApiList'
import { useTranslation } from 'react-i18next'
import { API_URL } from '~shared/lib/api/apiClient'
import axios from 'axios'

interface ContactInfo {
  address: string
  admissionOfficePhone: string
  facebook: string
  hoursSaturday: string
  hoursSunday: string
  hoursWeekdays: string
  id: number
  instagram: string
  receptionPhone: string
  telegram: string
  whatsapp: string
  youtube: string
}

const defaultContactInfo: ContactInfo = {
  address: 'г. Бишкек, ул. Горького 1/17',
  admissionOfficePhone: '+996 (312) 54-32-10',
  facebook: 'https://www.facebook.com/intuit.kg',
  hoursSaturday: '09:00 - 15:00',
  hoursSunday: 'Выходной',
  hoursWeekdays: ' 08:30 - 17:30',
  id: 1,
  instagram: 'https://www.instagram.com/intuit.kg',
  receptionPhone: '+996 (312) 54-32-11',
  telegram: 'https://t.me/intuit_kg',
  whatsapp: 'https://wa.me/996555123456',
  youtube: 'https://www.youtube.com/@intuit',
}

export function Footer() {
  const { t } = useTranslation()
  const [data, setData] = useState<ContactInfo>(defaultContactInfo)

  const { data: degreeData } = degreeQueries.useGetDegrees()
  const degrees = getApiList<DegreeSchema>(degreeData?.data)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const url = API_URL
          ? `${API_URL}/api/university/university-info/1/`
          : 'https://intuit.makalabox.com/api/university/university-info/1/'
        const res = await axios.get(url)
        if (res.data) {
          setData(res.data)
        }
      } catch (err) {
        // Keep default contact info on network error
      }
    }
    fetchInfo()
  }, [])

  return (
    <footer className="bg-[#0d1140] text-white py-8 mt-12">
      {/* Mobile Footer */}
      <div className="w-full px-4 hidden lg:block">
        <div className="flex items-center gap-2 mb-5">
          <img src={IntuitLogo} alt="Intuit" className="h-[50px] w-auto" />
          <p className="text-xs font-semibold leading-4 max-w-[150px]">
            {t('footer.fields.universityTitle', 'Международный Университет Инновационных Технологий')}
          </p>
        </div>
        <a href="#enroll-form">
          <Button
            variant="outlined"
            className="w-full my-3 duration-300 font-bold !text-white !bg-[#00956F] hover:!bg-[#007f5e] !border-none"
          >
            {t('footer.fields.feedback', 'Оставить заявку')}
          </Button>
        </a>
        <div className="flex justify-center gap-4 my-4">
          {data.facebook && (
            <a
              className="border border-white/30 rounded-lg p-1 hover:border-white transition-colors"
              href={data.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <IconButton className="!text-white">
                <FacebookRoundedIcon />
              </IconButton>
            </a>
          )}
          {data.whatsapp && (
            <a
              className="border border-white/30 rounded-lg p-1 hover:border-white transition-colors"
              href={data.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <IconButton className="!text-white">
                <WhatsAppIcon />
              </IconButton>
            </a>
          )}
          {data.instagram && (
            <a
              className="border border-white/30 rounded-lg p-1 hover:border-white transition-colors"
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconButton className="!text-white">
                <InstagramIcon />
              </IconButton>
            </a>
          )}
          {data.telegram && (
            <a
              className="border border-white/30 rounded-lg p-1 hover:border-white transition-colors"
              href={data.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <IconButton className="!text-white">
                <TelegramIcon />
              </IconButton>
            </a>
          )}
        </div>
        <p className="my-3 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} МУИТ / INTUIT. Все права защищены.
        </p>
      </div>

      {/* Desktop Footer */}
      <div className="w-full px-6 md:px-3 lg:hidden">
        <div className="flex items-center gap-3 mb-6">
          <img src={IntuitLogo} alt="Intuit" className="h-[58px] w-auto" />
          <p className="text-sm font-semibold leading-4 max-w-[220px]">
            {t('footer.fields.universityTitle', 'Международный Университет Инновационных Технологий')}
          </p>
        </div>

        {degrees.length > 0 && (
          <ul className="flex flex-wrap gap-6 pb-4 border-b border-white/10 text-sm">
            {degrees.map((univer, index) => (
              <li className="text-white hover:text-[#00956F] transition-colors" key={index}>
                <Link to={`/degree/${univer.slug}`}>{univer.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-4 gap-8 mt-6">
          <div>
            <h5 className="font-bold text-sm mb-2 text-[#00956F]">{t('footer.fields.address', 'Адрес')}</h5>
            <p className="text-xs text-gray-300 leading-5">{data.address}</p>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-2 text-[#00956F]">
              {t('footer.fields.workSchedule', 'График работы')}
            </h5>
            <p className="text-xs text-gray-300 leading-5">
              {t('footer.fields.workScheduleList.weekdays', 'Пн-Пт:')} {data.hoursWeekdays}
            </p>
            <p className="text-xs text-gray-300 leading-5">
              {t('footer.fields.workScheduleList.saturday', 'Сб: 09:00 - 15:00')}
            </p>
            <p className="text-xs text-gray-300 leading-5">
              {t('footer.fields.workScheduleList.sunday', 'Вс: Выходной')}
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-2 text-[#00956F]">
              {t('footer.fields.forAllQuestions', 'Контакты')}
            </h5>
            <p className="text-xs text-gray-300 flex items-center gap-1.5 mb-1">
              <LocalPhoneRoundedIcon fontSize="small" />
              <span>{data.admissionOfficePhone}</span>
            </p>
            <p className="text-xs text-gray-300 flex items-center gap-1.5">
              <LocalPhoneRoundedIcon fontSize="small" />
              <span>{data.receptionPhone}</span>
            </p>
          </div>

          <div>
            <a href="#enroll-form">
              <Button
                variant="outlined"
                className="w-full mb-4 duration-300 font-bold !text-white !border-white/50 hover:!bg-[#00956F] hover:!border-transparent"
              >
                {t('footer.fields.feedback', 'Подать заявку')}
              </Button>
            </a>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 mr-1">{t('footer.fields.socialMedia', 'Мы в соцсетях:')}</span>
              <div className="flex gap-1">
                {data.facebook && (
                  <a href={data.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <IconButton className="!text-white hover:!text-[#00956F]">
                      <FacebookRoundedIcon fontSize="small" />
                    </IconButton>
                  </a>
                )}
                {data.whatsapp && (
                  <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <IconButton className="!text-white hover:!text-[#00956F]">
                      <WhatsAppIcon fontSize="small" />
                    </IconButton>
                  </a>
                )}
                {data.instagram && (
                  <a href={data.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <IconButton className="!text-white hover:!text-[#00956F]">
                      <InstagramIcon fontSize="small" />
                    </IconButton>
                  </a>
                )}
                {data.telegram && (
                  <a href={data.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <IconButton className="!text-white hover:!text-[#00956F]">
                      <TelegramIcon fontSize="small" />
                    </IconButton>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Международный Университет Инновационных Технологий (МУИТ). Все права защищены.
        </div>
      </div>
    </footer>
  )
}
