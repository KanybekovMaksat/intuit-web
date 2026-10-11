import IntuitLogo from '../../assets/intuit-logo.png'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TelegramIcon from '@mui/icons-material/Telegram'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { degreeQueries } from '~entities/degree'
import { DegreeSchema } from '~entities/degree/degree.types'
import { getApiList } from '~shared/lib/api/getApiList'
import { useTranslation } from 'react-i18next'
import { useContactInfo } from '~entities/university-info'

export function Footer() {
  const { t } = useTranslation()
  const data = useContactInfo()

  const { data: degreeData } = degreeQueries.useGetDegrees()
  const degrees = getApiList<DegreeSchema>(degreeData?.data)

  const socials = [
    { href: data.facebook, label: 'Facebook', icon: <FacebookRoundedIcon fontSize="small" /> },
    { href: data.whatsapp, label: 'WhatsApp', icon: <WhatsAppIcon fontSize="small" /> },
    { href: data.instagram, label: 'Instagram', icon: <InstagramIcon fontSize="small" /> },
    { href: data.telegram, label: 'Telegram', icon: <TelegramIcon fontSize="small" /> },
  ].filter((item) => item.href)

  const colTitle = 'mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/50'

  return (
    <footer className="mt-20 bg-[#0d1140] text-white sm:mt-12">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-14 md:px-4 md:py-10">
        <div className="grid grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] gap-10 lg:grid-cols-2 md:grid-cols-1 md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={IntuitLogo} alt="МУИТ" className="h-14 w-auto" />
              <p className="max-w-[210px] text-sm font-semibold leading-[18px]">
                {t('footer.fields.universityTitle', 'Международный Университет Инновационных Технологий')}
              </p>
            </div>
            <a
              href="#enroll-form"
              className="group mt-7 inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              {t('footer.fields.feedback', 'Оставить заявку')}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <h5 className={colTitle}>{t('footer.fields.address', 'Адрес')}</h5>
            <p className="text-sm leading-6 text-white/85">{data.address}</p>
          </div>

          <div>
            <h5 className={colTitle}>{t('footer.fields.workSchedule', 'График работы')}</h5>
            <p className="text-sm leading-6 text-white/85">
              {t('footer.fields.workScheduleList.weekdays', 'Пн-Пт:')} {data.hoursWeekdays}
            </p>
            <p className="text-sm leading-6 text-white/85">
              {t('footer.fields.workScheduleList.saturday', 'Сб: 09:00 - 15:00')}
            </p>
            <p className="text-sm leading-6 text-white/85">
              {t('footer.fields.workScheduleList.sunday', 'Вс: Выходной')}
            </p>
          </div>

          <div>
            <h5 className={colTitle}>{t('footer.fields.forAllQuestions', 'Контакты')}</h5>
            <a
              href={`tel:${data.admissionOfficePhone.replace(/[^+\d]/g, '')}`}
              className="block text-sm leading-6 text-white/85 transition-colors hover:text-white"
            >
              {data.admissionOfficePhone}
            </a>
            <a
              href={`tel:${data.receptionPhone.replace(/[^+\d]/g, '')}`}
              className="block text-sm leading-6 text-white/85 transition-colors hover:text-white"
            >
              {data.receptionPhone}
            </a>
          </div>
        </div>

        {degrees.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-8 text-sm">
            {degrees.map((univer) => (
              <li key={univer.slug}>
                <Link
                  className="text-white/80 transition-colors hover:text-white"
                  to={`/degree/${univer.slug}`}
                >
                  {univer.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55">
          <span>
            &copy; {new Date().getFullYear()} Международный Университет Инновационных Технологий (МУИТ). Все права защищены.
          </span>
          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-primary"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
