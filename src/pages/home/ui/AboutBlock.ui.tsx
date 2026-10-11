import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play } from 'lucide-react'
import { Stats } from './Stats.ui'
import { Title } from '~shared/ui/title'

const VIDEO_ID = 'diIcqVN1Dag'

/** Click-to-load video: no YouTube iframe weight until the visitor asks for it. */
const VideoPoster = ({ label }: { label: string }) => {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-primary sm:rounded-2xl">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={label}
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label}
          className="group absolute inset-0 block h-full w-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 inline-flex h-14 items-center gap-3 rounded-full bg-white pl-3 pr-6 text-[15px] font-semibold text-primary transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <Play size={16} fill="currentColor" />
            </span>
            {label}
          </span>
        </button>
      )}
    </div>
  )
}

export const AboutBlock = () => {
  const { t } = useTranslation()

  return (
    <section>
      <Title>{t('homepage.aboutUniversity.title')}</Title>

      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch gap-6 lg:grid-cols-1">
        <div className="flex flex-col justify-between rounded-3xl bg-gray-light p-10 xll:p-8 sm:rounded-2xl sm:p-6">
          <p className="text-[1.75rem] font-semibold leading-snug tracking-tight text-primary text-balance md:text-2xl">
            {t('homepage.aboutUniversity.goal')}
          </p>
          <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-ink-soft">
            {t('homepage.aboutUniversity.description')}
          </p>
        </div>

        <VideoPoster label={t('homepage.aboutUniversity.watchVideo', 'Смотреть видео')} />
      </div>

      <Stats />
    </section>
  )
}
