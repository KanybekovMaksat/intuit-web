import { useTranslation } from 'react-i18next'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'framer-motion'

type Tone = 'navy' | 'green' | 'soft'

interface StatProps {
  count: number
  label: string
  prefix?: string
  tone: Tone
}

const toneClass: Record<Tone, { box: string; label: string }> = {
  navy: { box: 'bg-primary text-white', label: 'text-white/75' },
  green: { box: 'bg-green-dark text-white', label: 'text-white/80' },
  soft: { box: 'bg-white text-primary border border-line', label: 'text-ink-soft' },
}

const Stat = ({ count, label, prefix = '', tone }: StatProps) => {
  const reduce = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const styles = toneClass[tone]

  return (
    <div
      ref={ref}
      className={`flex min-h-[168px] flex-col justify-between rounded-2xl p-6 sm:min-h-[132px] sm:p-5 ${styles.box}`}
    >
      <div className="text-5xl font-semibold leading-none tracking-tight tabular-nums lg:text-4xl">
        {prefix}
        {reduce || inView ? (
          <CountUp start={reduce ? count : 0} end={count} duration={2} separator="" />
        ) : (
          count
        )}
      </div>
      <div className={`mt-6 text-sm leading-snug ${styles.label}`}>{label}</div>
    </div>
  )
}

export const Stats = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-6 grid grid-cols-4 gap-4 lg:grid-cols-2">
      <Stat tone="navy" count={2006} label={t('homepage.Stats.yearOfEstablishment')} />
      <Stat tone="soft" count={8} label={t('homepage.Stats.institutes')} />
      <Stat tone="soft" prefix="+" count={155} label={t('homepage.Stats.facultyMembers')} />
      <Stat tone="green" prefix="+" count={5000} label={t('homepage.Stats.graduates')} />
    </div>
  )
}
