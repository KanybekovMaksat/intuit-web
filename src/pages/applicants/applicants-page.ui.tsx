import { t } from 'i18next'
import { Check, ArrowUpRight } from 'lucide-react'
import { PageHero } from '~shared/ui/page'

const portals = [
  { label: 'Для граждан Кыргызстана', href: 'https://2020.edu.gov.kg/reports?id_university=30' },
  { label: 'Для иностранных граждан', href: 'https://edugate.edu.gov.kg/plan/30' },
]

export const ApplicantsPage = () => {
  const documents = t('applicantsPage.documentsList', { returnObjects: true }) as unknown
  const documentList = Array.isArray(documents) ? (documents as string[]) : []
  const notes = String(t('applicantsPage.additionalNotes'))
    .split('\n')
    .filter((line) => line.trim().length > 0)

  return (
    <div className="mb-20">
      <PageHero compact title={t('enrollPage.infoSection.title')} />

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-1">
        <section className="rounded-3xl bg-gray-light p-8 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {t('applicantsPage.admission')}
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {t('applicantsPage.paymentBenefits')}
          </p>
        </section>

        <section className="rounded-3xl border border-line bg-white p-8 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {t('applicantsPage.registrationAndSelection')}
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {t('applicantsPage.electronicRegistration')}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {portals.map((portal) => (
              <a
                key={portal.href}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-green-dark px-5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary active:scale-[0.98]"
              >
                {portal.label}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-14">
        <h2 className="text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          {t('applicantsPage.documentsForElectronicRegistration')}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-1">
          {documentList.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
                <Check size={14} aria-hidden strokeWidth={3} />
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {notes.length > 0 && (
        <section className="mt-14 rounded-3xl bg-primary p-8 text-white sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('applicantsPage.additionalInfo')}
          </h2>
          <div className="mt-3 grid max-w-[70ch] gap-2 text-[1.0625rem] leading-relaxed text-white/85">
            {notes.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
