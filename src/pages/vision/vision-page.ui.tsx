import { t } from 'i18next'
import { PageHero } from '~shared/ui/page'

const taskKeys = [
  'vision.primary',
  'vision.primary2',
  'vision.primary3',
  'vision.primary4',
  'vision.primary5',
  'vision.primary6',
  'vision.primary7',
  'vision.primary8',
  'vision.primary9',
]

export const VisionPage = () => {
  const blocks = [
    { title: t('vision.item'), text: t('vision.text') },
    { title: t('vision.text2'), text: t('vision.text3') },
  ]

  return (
    <div className="mb-20">
      <PageHero
        compact
        title={t('vision.title')}
        crumbs={[{ label: t('aboutPage.title', 'Об университете'), to: '/about' }]}
      />

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-1">
        {blocks.map((block) => (
          <section key={block.title} className="rounded-3xl bg-gray-light p-8 sm:p-5">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">{block.title}</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{block.text}</p>
          </section>
        ))}
      </div>

      <section className="mt-5 rounded-3xl bg-primary p-8 text-white sm:p-5">
        <h2 className="text-2xl font-semibold tracking-tight">{t('vision.goal')}</h2>
        <p className="mt-3 max-w-[70ch] text-[1.0625rem] leading-relaxed text-white/85">
          {t('vision.description')}
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-[2rem] font-semibold tracking-tight text-ink md:text-2xl">
          {t('vision.heading')}
        </h2>
        <ol className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-1">
          {taskKeys.map((key, index) => (
            <li
              key={key}
              className="flex gap-4 rounded-2xl border border-line bg-white p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-dark text-sm font-semibold tabular-nums text-white">
                {index + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-ink-soft">{t(key)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
