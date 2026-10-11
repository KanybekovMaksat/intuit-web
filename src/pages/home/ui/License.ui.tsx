import Fancybox from './Fancybox'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'
import { ArrowUpRight, FileBadge2, ScrollText } from 'lucide-react'

const documents = [
  {
    href: 'https://intuit.kg/documents/license.pdf',
    titleKey: 'homepage.License.licenses',
    Icon: ScrollText,
  },
  {
    href: 'https://intuit.kg/documents/Svidetelstvo.png',
    titleKey: 'homepage.License.certificate',
    Icon: FileBadge2,
  },
]

export const License = () => {
  return (
    <section className="mx-auto py-6">
      <Title>{t('homepage.License.documents')}</Title>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch gap-6 lg:grid-cols-1">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold leading-snug tracking-tight text-primary md:text-xl">
              {t('homepage.License.officialDocuments')}
            </h3>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-soft">
              {t('homepage.License.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
            {documents.map(({ href, titleKey, Icon }) => (
              <a
                key={href}
                data-fancybox="gallery"
                href={href}
                className="group flex min-h-[200px] flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(42,33,114,0.25)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={28} strokeWidth={1.6} />
                </span>
                <div>
                  <h4 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                    {t(titleKey)}
                  </h4>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t('homepage.License.viewDocument')}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Fancybox>
    </section>
  )
}
