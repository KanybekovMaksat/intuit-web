import { Link, useParams } from 'react-router-dom'
import { staffQueries } from '~entities/staff'
import { t } from 'i18next'
import { FileUser, ChevronRight } from 'lucide-react'
import { Loader } from '~shared/ui/loader'

const contactHref = (value: string) =>
  /^(https?:|mailto:|tel:)/i.test(value) ? value : value.includes('@') ? `mailto:${value}` : value

const chipClass =
  'inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-[15px] font-semibold text-ink transition-all duration-200 hover:bg-white/90 active:scale-[0.98]'

export const TeacherPage = () => {
  const { slug } = useParams()
  const {
    data: staffData,
    isSuccess,
    isError,
    isLoading,
  } = staffQueries.useGetStaffDetail(slug || '')

  if (!slug) {
    return <div className="py-20 text-center text-ink-soft">Invalid URL</div>
  }
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div className="py-20 text-center text-ink-soft">{t('loading.dataNotLoaded')}</div>
  }
  if (!isSuccess) return null

  const person = staffData.data

  const contacts = [
    { key: 'whatsapp', label: 'WhatsApp', icon: '/social-icons/whatsapp.svg', value: person.whatsapp },
    { key: 'telegram', label: 'Telegram', icon: '/social-icons/telegram.svg', value: person.telegram },
    { key: 'instagram', label: 'Instagram', icon: '/social-icons/instagram.svg', value: person.instagram },
    { key: 'facebook', label: 'Facebook', icon: '/social-icons/facebook.svg', value: person.facebook },
    { key: 'email', label: 'Email', icon: '/social-icons/email.svg', value: person.email },
  ].filter((contact) => Boolean(contact.value))

  return (
    <header
      className="relative mb-10 mt-5 overflow-hidden rounded-3xl bg-primary text-white sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(50% 90% at 100% 110%, rgba(0,149,111,0.5) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      <div className="grid grid-cols-[240px_minmax(0,1fr)] items-center gap-10 px-12 py-12 xll:px-8 lg:px-6 md:grid-cols-1 md:justify-items-center md:gap-6 sm:px-4 sm:py-8">
        <img
          src={person.image}
          alt={person.name}
          className="h-[300px] w-[240px] rounded-2xl object-cover ring-1 ring-white/20 md:h-[260px] md:w-[208px]"
        />

        <div className="md:text-center">
          <nav aria-label={t('breadcrumbs.label', 'Навигация')}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70 md:justify-center">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  {t('breadcrumbs.home', 'Главная')}
                </Link>
              </li>
              <ChevronRight size={14} aria-hidden className="text-white/40" />
              <li>{t('breadcrumbs.teachers', 'Преподаватели')}</li>
            </ol>
          </nav>

          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-balance md:text-[1.9rem]">
            {person.name}
          </h1>
          {person.description && (
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-white/80 md:text-base">
              {person.description}
            </p>
          )}

          {(contacts.length > 0 || person.cv) && (
            <div className="mt-7 flex flex-wrap gap-2.5 md:justify-center">
              {contacts.map((contact) => (
                <a
                  key={contact.key}
                  href={contactHref(String(contact.value))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipClass}
                >
                  <img className="h-5 w-5" src={contact.icon} alt="" />
                  {contact.label}
                </a>
              ))}
              {person.cv && (
                <Link to="cv" target="_blank" className={chipClass}>
                  <FileUser size={20} aria-hidden className="text-green-dark" />
                  {t('teacherPage.cv', 'Резюме')}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
