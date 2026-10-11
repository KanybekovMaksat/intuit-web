import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import CountUp from 'react-countup'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { degreeQueries } from '~entities/degree'
import { facultyQueries } from '~entities/faculties'
import { FacultySchema } from '~entities/faculties/faculty.types'
import { DegreeSchema } from '~entities/degree/degree.types'
import { Loader } from '~shared/ui/loader'
import { getApiList } from '~shared/lib/api/getApiList'

const ease = [0.16, 1, 0.3, 1] as const

// Cut-out of two students (public/hero-students-cutout.webp); the old portrait is the fallback
const HERO_IMAGE = '/hero-students-cutout.webp'
const HERO_FALLBACK = '/imagee.png'

export const HomeHero = () => {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const { data: degreeData, isLoading, isError } = degreeQueries.useGetDegrees()
  const { data: facultyData } = facultyQueries.useGetFaculties()

  // Pointer parallax lives in motion values: no React state, no re-render per mouse move
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.6 })
  const springY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.6 })

  const photoX = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const photoY = useTransform(springY, [-0.5, 0.5], [-4, 4])
  const discX = useTransform(springX, [-0.5, 0.5], [26, -26])
  const discY = useTransform(springY, [-0.5, 0.5], [16, -16])
  const ringX = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const ringY = useTransform(springY, [-0.5, 0.5], [-10, 10])
  const chipX = useTransform(springX, [-0.5, 0.5], [-20, 20])
  const chipY = useTransform(springY, [-0.5, 0.5], [-12, 12])

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('loading.error')}</div>
  }

  const degrees = getApiList<DegreeSchema>(degreeData?.data)
  const faculties = getApiList<FacultySchema>(facultyData?.data)
  const title = t('homepage.hero.title', 'Выбирай не просто специальность, выбирай будущее с МУИТ')
  const words = title.split(' ')

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  // Entrance order tells the hierarchy: headline, support copy, action, then the people
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        }

  const goToEnroll = (e: React.MouseEvent) => {
    const el = document.getElementById('enroll-form')
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mb-16 overflow-hidden rounded-3xl bg-primary sm:mb-10 sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(55% 90% at 82% 100%, rgba(0,149,111,0.55) 0%, rgba(0,149,111,0) 70%), radial-gradient(40% 60% at 0% 0%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%)',
      }}
    >
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-end gap-6 px-12 pt-14 xll:px-8 lg:grid-cols-1 lg:px-6 lg:pt-10 sm:px-4 sm:pt-8">
        <div className="pb-12 lg:pb-2">
          {/* Words rise out of a mask one by one so the headline reads in order */}
          <h1
            aria-label={title}
            className="max-w-[20ch] text-[3.25rem] font-semibold leading-[1.06] tracking-tight text-white text-balance xll:text-[2.75rem] lg:text-[2.5rem] md:text-[2rem] sm:text-[1.65rem]"
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} aria-hidden>
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span
                    className="inline-block"
                    {...(reduce
                      ? {}
                      : {
                          initial: { y: '115%' },
                          animate: { y: 0 },
                          transition: { duration: 0.85, delay: 0.05 + index * 0.07, ease },
                        })}
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <motion.p
            {...rise(0.45)}
            className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80 md:text-base"
          >
            {t('homepage.hero.subtitle', 'Образование, которое ведёт к реальной работе')}
          </motion.p>

          <motion.div {...rise(0.58)} className="mt-8">
            <a
              href="#enroll-form"
              onClick={goToEnroll}
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
            >
              {/* Light sweep on hover: feedback that the button is the main action */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
              />
              <span className="relative">{t('homepage.hero.helpButton', 'Помочь с выбором')}</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {degrees.map((item, index) => (
              <motion.div
                key={item.id}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: 0.7 + index * 0.05, ease },
                    })}
              >
                <Link
                  to={`/degree/${item.slug}/`}
                  className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-white/30 px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-primary"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end lg:justify-center">
          <div className="relative w-full max-w-[460px] xll:max-w-[400px] lg:max-w-[380px] sm:max-w-[320px]">
            {/* Depth layers move against the photo, so the scene reads as three planes */}
            <motion.div style={{ x: discX, y: discY }} className="absolute -right-8 top-4 sm:-right-3">
              <motion.span
                aria-hidden
                className="block h-44 w-44 rounded-full bg-green sm:h-28 sm:w-28"
                {...(reduce
                  ? {}
                  : {
                      initial: { scale: 0, opacity: 0 },
                      animate: { scale: [1, 1.07, 1], opacity: 1 },
                      transition: {
                        scale: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
                        opacity: { duration: 0.6, delay: 0.3 },
                      },
                    })}
              />
            </motion.div>

            <motion.div style={{ x: ringX, y: ringY }} className="absolute -left-10 top-16 sm:hidden">
              <motion.span
                aria-hidden
                className="block h-28 w-28 rounded-full border-2 border-dashed border-white/30"
                {...(reduce
                  ? {}
                  : { animate: { rotate: 360 }, transition: { duration: 40, repeat: Infinity, ease: 'linear' } })}
              />
            </motion.div>

            {/* Light panel grows from the bottom edge, then the people step in */}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 top-[24%] origin-bottom rounded-t-3xl bg-gradient-to-b from-[#E3E8FB] to-white"
              {...(reduce
                ? {}
                : {
                    initial: { scaleY: 0, opacity: 0 },
                    animate: { scaleY: 1, opacity: 1 },
                    transition: { duration: 0.9, delay: 0.15, ease },
                  })}
            />

            <motion.div style={{ x: photoX, y: photoY }} className="relative">
              <motion.img
                className="relative block h-auto w-full select-none"
                src={HERO_IMAGE}
                onError={(e) => {
                  const img = e.currentTarget
                  if (!img.src.endsWith(HERO_FALLBACK)) img.src = HERO_FALLBACK
                }}
                alt="Студенты МУИТ с ноутбуком"
                width={1004}
                height={1024}
                {...({ fetchpriority: 'high' } as Record<string, string>)}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 36 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.9, delay: 0.35, ease },
                    })}
              />
            </motion.div>

            {/* Stat chips: parallax outside, entrance in the middle, slow float inside */}
            <motion.div
              style={{ x: chipX, y: chipY }}
              className="absolute -left-14 bottom-24 xll:-left-6 lg:-left-4 sm:bottom-16"
            >
              <motion.div
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.8, y: 16 },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      transition: { duration: 0.6, delay: 1.0, ease },
                    })}
              >
                <motion.div
                  className="rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(20,18,58,0.55)] sm:px-3 sm:py-2"
                  {...(reduce
                    ? {}
                    : {
                        animate: { y: [0, -8, 0] },
                        transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
                      })}
                >
                  <div className="text-2xl font-semibold leading-none tracking-tight text-primary tabular-nums sm:text-xl">
                    {reduce ? '+5000' : <CountUp start={0} end={5000} duration={2.4} delay={1} separator="" prefix="+" />}
                  </div>
                  <div className="mt-1 text-xs text-ink-soft">{t('homepage.Stats.graduates')}</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: chipX, y: chipY }}
              className="absolute -right-4 bottom-14 sm:hidden"
            >
              <motion.div
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.8, y: 16 },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      transition: { duration: 0.6, delay: 1.15, ease },
                    })}
              >
                <motion.div
                  className="rounded-2xl bg-primary px-4 py-3 text-white shadow-[0_18px_40px_-18px_rgba(20,18,58,0.7)] ring-1 ring-white/20"
                  {...(reduce
                    ? {}
                    : {
                        animate: { y: [0, 8, 0] },
                        transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
                      })}
                >
                  <div className="text-2xl font-semibold leading-none tracking-tight tabular-nums">
                    {reduce ? '8' : <CountUp start={0} end={8} duration={1.6} delay={1.15} />}
                  </div>
                  <div className="mt-1 text-xs text-white/75">{t('homepage.Stats.institutes')}</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {faculties.length > 0 && (
        <div className="border-t border-white/15 bg-primary/55 backdrop-blur-sm">
          <ul className="flex snap-x gap-0 divide-x divide-white/15 overflow-x-auto px-0 lg:snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {faculties.map((faculty, index) => (
              <motion.li
                key={faculty.slug}
                className="min-w-[150px] flex-1 snap-start lg:min-w-[210px]"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: 0.9 + index * 0.05, ease },
                    })}
              >
                <Link
                  to={`/institutes/${faculty.slug}`}
                  className="group flex h-full items-start justify-between gap-3 px-6 py-5 text-[14px] font-medium leading-snug text-white/90 transition-colors duration-200 hover:bg-white hover:text-primary sm:px-4"
                >
                  <span>{faculty.subtitle}</span>
                  <ArrowUpRight
                    size={18}
                    className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
