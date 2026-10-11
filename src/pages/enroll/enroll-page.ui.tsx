import { t } from 'i18next'
import { Check, FileText } from 'lucide-react'
import { PageHero } from '~shared/ui/page'

const linkClass =
  'font-medium text-green-dark underline underline-offset-4 transition-colors hover:text-primary'

const importantKeys = [
  'enrollPage.importantLinks.noMedCertificate',
  'enrollPage.importantLinks.noDormitory',
  'enrollPage.importantLinks.programList',
  'enrollPage.importantLinks.brochure',
]

const documentKeys = [
  'enrollPage.documentsSection.admissionProcedure',
  'enrollPage.documentsSection.noORTNeeded',
  'enrollPage.documentsSection.benefitsDocuments',
  'enrollPage.documentsSection.bachelorFees',
  'enrollPage.documentsSection.masterFees',
  'enrollPage.documentsSection.internationalFees',
]

const examKeys = [
  'enrollPage.foreignStudentsSection.entranceExams.item1',
  'enrollPage.foreignStudentsSection.entranceExams.item2',
  'enrollPage.foreignStudentsSection.entranceExams.item3',
  'enrollPage.foreignStudentsSection.entranceExams.item4',
]

export const EnrollPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        title={t('enrollPage.introCard.title')}
        subtitle={t('enrollPage.introCard.description')}
      />

      <div className="mt-10 grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-5 lg:grid-cols-1">
        <section className="rounded-3xl bg-gray-light p-8 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {t('enrollPage.infoSection.title')}
          </h2>
          <div className="prose-muit prose-wide mt-4">
            <p>{t('enrollPage.infoSection.text1')}</p>
            <p>{t('enrollPage.infoSection.text2')}</p>
            <p>
              {t('enrollPage.infoSection.text3')}{' '}
              <a
                href="https://2020.edu.gov.kg/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                2020.edu.gov.kg
              </a>{' '}
              и МУИТ.
            </p>
            <p>
              {t('enrollPage.infoSection.text4')}{' '}
              <a
                href="https://2020.edu.gov.kg/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                2020.edu.gov.kg
              </a>{' '}
              (портал для граждан Кыргызской Республики) и{' '}
              <a
                href="https://edugate.edu.gov.kg"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                edugate.edu.gov.kg
              </a>{' '}
              (портал приема граждан зарубежных стран), т.е. личное присутствие абитуриента не
              требуется.
            </p>
          </div>
        </section>

        <aside className="rounded-3xl bg-primary p-8 text-white sm:p-5">
          <ul className="grid gap-4">
            {importantKeys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check size={14} aria-hidden strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed text-white/90">{t(key)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          {t('enrollPage.documentsSection.title')}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-1">
          {documentKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={22} aria-hidden />
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-3xl bg-gray-light p-8 sm:p-5">
        <h2 className="text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          {t('enrollPage.foreignStudentsSection.title')}
        </h2>
        <p className="mt-3 max-w-[75ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          {t('enrollPage.foreignStudentsSection.text')}
        </p>

        <h3 className="mt-8 text-lg font-semibold text-ink">
          {t('enrollPage.foreignStudentsSection.entranceExams.title')}
        </h3>
        <ol className="mt-4 grid gap-3">
          {examKeys.map((key, index) => (
            <li key={key} className="flex gap-4 rounded-2xl bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-dark text-sm font-semibold tabular-nums text-white">
                {index + 1}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{t(key)}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-1">
          <p className="rounded-2xl bg-white p-5 text-[15px] leading-relaxed text-ink-soft">
            {t('enrollPage.foreignStudentsSection.registration')}
          </p>
          <p className="rounded-2xl bg-white p-5 text-[15px] leading-relaxed text-ink-soft">
            {t('enrollPage.foreignStudentsSection.documents')}
          </p>
        </div>
      </section>
    </div>
  )
}
