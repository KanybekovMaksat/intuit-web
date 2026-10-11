import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'
import {
  Globe,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Check,
  Award,
  Building2,
  Calendar,
  Layers,
  Target,
} from 'lucide-react'
import { PageHero } from '~shared/ui/page'

const StatTile = ({
  icon: Icon,
  value,
  suffix = '',
  label,
}: {
  icon: React.ElementType
  value: number
  suffix?: string
  label: string
}) => {
  const reduce = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <li ref={ref} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={24} aria-hidden />
      </span>
      <div>
        <p className="text-4xl font-semibold leading-none tracking-tight tabular-nums text-ink">
          {reduce || !inView ? value : <CountUp end={value} duration={2.4} />}
          {suffix}
        </p>
        <p className="mt-2 text-[15px] text-ink-soft">{label}</p>
      </div>
    </li>
  )
}

const asList = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : [])

export const InternationalStudents = () => {
  const { t, i18n } = useTranslation()

  // Default to Kyrgyz on mount when the visitor has not chosen a language yet
  useEffect(() => {
    if (i18n.language !== 'kg' && !localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('kg')
    }
  }, [i18n])

  const exchangeItems = asList(t('internationalPage.exchange.items', { returnObjects: true }))
  const projectAreas = asList(
    t('internationalPage.globalEngagement.projectAreas.items', { returnObjects: true })
  )
  const duties = t('internationalPage.roles.duties', { returnObjects: true }) as unknown
  const dutyList = Array.isArray(duties)
    ? (duties as { title: string; items?: string[] }[])
    : []

  const contacts = [
    {
      icon: MapPin,
      label: t('internationalPage.contact.addressLabel'),
      value: t('internationalPage.contact.addressValue'),
    },
    {
      icon: Phone,
      label: t('internationalPage.contact.phoneLabel'),
      value: '+996 770 604 233',
      href: 'tel:+996770604233',
    },
    {
      icon: Mail,
      label: t('internationalPage.contact.emailLabel'),
      value: 'vise.edu.kg@gmail.com',
      href: 'mailto:vise.edu.kg@gmail.com',
    },
    {
      icon: Building2,
      label: t('internationalPage.contact.locationLabel'),
      value: t('internationalPage.contact.locationValue'),
    },
  ]

  const partners = [
    {
      title: t('internationalPage.strategicPartners.erasmus.title'),
      text: t('internationalPage.strategicPartners.erasmus.description'),
      icon: Globe,
    },
    {
      title: t('internationalPage.strategicPartners.iaeste.title'),
      text: t('internationalPage.strategicPartners.iaeste.description'),
      icon: Briefcase,
    },
  ]

  return (
    <div className="mb-10">
      <PageHero
        crumbs={[{ label: t('internationalPage.hero.department') }]}
        title={
          <>
            {t('internationalPage.hero.title')}{' '}
            <span className="text-white/70">{t('internationalPage.hero.subtitle')}</span>
          </>
        }
        subtitle={t('internationalPage.hero.description')}
      />

      <ul className="mt-6 grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1">
        <StatTile icon={Users} value={1500} suffix="+" label={t('internationalPage.stats.students')} />
        <StatTile icon={Building2} value={15} label={t('internationalPage.stats.partners')} />
        <StatTile icon={Globe} value={10} suffix="+" label={t('internationalPage.stats.countries')} />
        <StatTile icon={Calendar} value={2006} label={t('internationalPage.stats.founded')} />
      </ul>

      <section className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-1">
        <div className="rounded-3xl bg-gray-light p-8 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {t('internationalPage.whoWeAre.title')}
          </h2>
          <div className="mt-4 grid gap-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            <p>{t('internationalPage.whoWeAre.text1')}</p>
            <p>{t('internationalPage.whoWeAre.text2')}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white sm:p-5">
          <Target
            aria-hidden
            size={140}
            className="pointer-events-none absolute -bottom-8 -right-8 text-white/10"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight">
            {t('internationalPage.mission.title')}
          </h2>
          <blockquote className="relative mt-4 border-l-2 border-green pl-4 text-lg leading-relaxed text-white">
            {t('internationalPage.mission.quote')}
          </blockquote>
          <p className="relative mt-4 text-[15px] leading-relaxed text-white/80">
            {t('internationalPage.mission.description')}
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
          {t('internationalPage.globalEngagement.title')}
        </h2>
        <p className="mt-4 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          {t('internationalPage.globalEngagement.description')}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-1">
          {[
            {
              icon: Briefcase,
              title: t('internationalPage.globalEngagement.partnership.title'),
              content: t('internationalPage.globalEngagement.partnership.content'),
            },
            {
              icon: Layers,
              title: t('internationalPage.globalEngagement.jointProjects.title'),
              content: t('internationalPage.globalEngagement.jointProjects.content'),
            },
          ].map(({ icon: Icon, title, content }) => (
            <article key={title} className="rounded-2xl border border-line bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{content}</p>
            </article>
          ))}
        </div>

        {projectAreas.length > 0 && (
          <div className="mt-5 rounded-3xl bg-gray-light p-8 sm:p-5">
            <h3 className="text-xl font-semibold text-ink">
              {t('internationalPage.globalEngagement.projectAreas.title')}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-1">
              {projectAreas.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
                    <Check size={14} aria-hidden strokeWidth={3} />
                  </span>
                  <span className="text-[15px] font-medium leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="mt-14 grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-8 lg:grid-cols-1">
        <div>
          <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
            {t('internationalPage.exchange.title')}{' '}
            <span className="text-green-dark">{t('internationalPage.exchange.subtitle')}</span>
          </h2>
          <div className="mt-5 grid max-w-[70ch] gap-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            <p>{t('internationalPage.exchange.text1')}</p>
            <p>{t('internationalPage.exchange.text2')}</p>
          </div>
          {exchangeItems.length > 0 && (
            <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-1">
              {exchangeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
                    <Check size={14} aria-hidden strokeWidth={3} />
                  </span>
                  <span className="text-[15px] font-medium leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="rounded-3xl bg-green-dark p-8 text-white sm:p-5">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Award size={22} aria-hidden />
            {t('internationalPage.strategicPartners.title')}
          </h3>
          <ul className="mt-5 grid gap-3">
            {partners.map(({ title, text, icon: Icon }) => (
              <li key={title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-dark">
                    <Icon size={22} aria-hidden />
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">{text}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {dutyList.length > 0 && (
        <section className="mt-14">
          <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
            {t('internationalPage.roles.title')}
          </h2>
          <ol className="mt-8 grid grid-cols-3 gap-5 lg:grid-cols-1">
            {dutyList.map((duty, index) => (
              <li key={duty.title} className="rounded-3xl border border-line bg-white p-7 sm:p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold tabular-nums text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">
                    {duty.title}
                  </h3>
                </div>
                {Array.isArray(duty.items) && (
                  <ul className="mt-5 grid gap-2.5">
                    {duty.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-14 grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-stretch gap-5 lg:grid-cols-1">
        <div className="rounded-3xl border border-line bg-white p-8 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {t('internationalPage.contact.title')}
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-1">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} aria-hidden />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-ink-soft">{label}</dt>
                  <dd className="mt-1 whitespace-pre-line text-[15px] font-medium text-ink break-words">
                    {href ? (
                      <a href={href} className="transition-colors hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <article className="flex flex-col items-center rounded-3xl bg-gray-light p-8 text-center sm:p-5">
          <img
            src="/zhazgul.jpeg"
            alt={t('internationalPage.team.name')}
            className="h-36 w-36 rounded-full object-cover ring-4 ring-white"
          />
          <h3 className="mt-5 text-xl font-semibold text-ink">{t('internationalPage.team.name')}</h3>
          <p className="mt-1 font-medium text-green-dark">{t('internationalPage.team.position')}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {t('internationalPage.team.bio')}
          </p>
        </article>
      </section>
    </div>
  )
}
