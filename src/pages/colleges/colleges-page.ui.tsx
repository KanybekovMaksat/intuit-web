import { ArrowUpRight } from 'lucide-react'
import ComtehnoLogo from './comtehno-logo.png'
import InnovativeCollegeLogo from './innovative-college-logo.png'
import { NewsList } from '~widgets/news-list'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { EnrollForm } from '~widgets/enroll-form'
import { t } from 'i18next'
import { PageHero } from '~shared/ui/page'

const colleges = [
  {
    key: 'comtehnoCard',
    href: 'https://comtehno.kg',
    logo: ComtehnoLogo,
    logoBg: 'bg-gray-light',
  },
  {
    key: 'itecCard',
    href: 'https://itec.kg/',
    logo: InnovativeCollegeLogo,
    logoBg: 'bg-primary',
  },
]

export const CollegesPage = () => {
  return (
    <div className="mb-10">
      <PageHero
        title={t('homepage.degrees.colleges')}
        subtitle={t('collegesPage.after9Or11')}
      />

      <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-1">
        {colleges.map((college) => (
          <li key={college.key}>
            <a
              href={college.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-6 rounded-3xl border border-line bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_22px_44px_-26px_rgba(42,33,114,0.4)] sm:p-5"
            >
              <span
                className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl ${college.logoBg}`}
              >
                <img
                  src={college.logo}
                  alt=""
                  className="h-full w-full object-contain p-2"
                />
              </span>
              <div>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-ink">
                  {t(`collegesPage.${college.key}.title`)}
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {t(`collegesPage.${college.key}.description`)}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-green-dark">
                {t(`collegesPage.${college.key}.moreInfo`)}
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-[75ch] text-[1.0625rem] leading-relaxed text-ink-soft">
        {t('collegesPage.careerOpportunities')}
      </p>

      <NewsList />
      <SpeakerVideoList />
      <EnrollForm />
    </div>
  )
}
