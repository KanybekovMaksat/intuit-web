import { t } from 'i18next'
import { ArrowUpRight, Clock } from 'lucide-react'
import { PageHero } from '~shared/ui/page'

export const WindowPage = () => {
  const services = [
    { name: t('windowPage.services.leaf'), time: t('windowPage.time.oneDay') },
    { name: t('windowPage.services.studyCertificate'), time: t('windowPage.time.oneDay') },
    { name: t('windowPage.services.militaryCertificate'), time: t('windowPage.time.oneDay') },
    { name: t('windowPage.services.academicCertificate'), time: t('windowPage.time.threeDays') },
    { name: t('windowPage.services.archiveCertificate'), time: t('windowPage.time.threeDays') },
  ]

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('windowPage.servicesWindow')}
        subtitle={t('windowPage.digitalTransformationConcept')}
        actions={
          <a
            href="http://178.217.169.139:3000/lms/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            {t('windowPage.applyForCertificate')}
            <ArrowUpRight size={18} aria-hidden />
          </a>
        }
      />

      <section className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 bg-gray-light px-6 py-4 text-sm font-semibold text-ink-soft sm:px-4">
            <span>{t('windowPage.service')}</span>
            <span>{t('windowPage.executionTime')}</span>
          </div>
          <ul className="divide-y divide-line">
            {services.map((service) => (
              <li
                key={service.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:px-4"
              >
                <span className="text-[15px] font-medium text-ink">{service.name}</span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-light px-3 py-1 text-sm text-ink-soft">
                  <Clock size={14} aria-hidden />
                  {service.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-1">
        <p className="rounded-3xl bg-gray-light p-8 text-[1.0625rem] leading-relaxed text-ink-soft sm:p-5">
          {t('windowPage.readyCertificates')}
        </p>
        <div className="grid gap-2 rounded-3xl bg-gray-light p-8 text-[1.0625rem] leading-relaxed text-ink-soft sm:p-5">
          <p>{t('windowPage.general')}</p>
          <p>{t('windowPage.fullTime')}</p>
          <p>{t('windowPage.partTime')}</p>
        </div>
      </section>
    </div>
  )
}
