import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage, getLanguage } from '~shared/lib/i18n/i18nHelper'
import IntuitLogo from '../../assets/intuit-logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { ChevronDownIcon, ChevronRight, Menu, X, ArrowRight } from 'lucide-react'
import { FlagEn, FlagRu, FlagKg } from './flags'

const languageMap = {
  en: { shortLabel: 'EN', label: 'English', flag: <FlagEn /> },
  ru: { shortLabel: 'RU', label: 'Русский', flag: <FlagRu /> },
  kg: { shortLabel: 'KG', label: 'Кыргызча', flag: <FlagKg /> },
}

/** A section stays highlighted on its nested routes (/institutes/slug keeps "Институты" active). */
const isPathActive = (pathname: string, link: string) => {
  const base = link.replace(/\/+$/, '')
  return pathname === link || pathname === base || pathname.startsWith(`${base}/`)
}

export const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = getLanguage()
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scrolled state via IntersectionObserver on a 1px sentinel (no scroll listener)
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;visibility:hidden'
    document.body.prepend(sentinel)
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  // Route change closes the mobile sheet
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }, [location.pathname])

  // Mobile sheet: Escape closes, page does not scroll behind it
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [isMobileMenuOpen])

  // Apply: scroll to the form when this page has one, otherwise go home and scroll there
  const goToApply = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsMobileMenuOpen(false)
    const form = document.getElementById('enroll-form')
    if (form) {
      form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
    } else {
      navigate('/', { state: { scrollTo: 'enroll-form' } })
    }
  }

  const applyLabel = t('header.apply', 'Подать заявку')

  const handleLanguageChange = (lng: string) => {
    setLanguage(lng)
    setIsDropdownOpen(false)
  }

  const currentLanguage = languageMap[i18n.language as keyof typeof languageMap] || {
    shortLabel: 'RU',
    label: 'Русский',
    flag: <FlagRu />,
  }

  const headerItems = [
    {
      label: t('enrollPage.introCard.title', 'Абитуриенту'),
      link: '/document/informaciya-dlya-abiturientov',
    },
    { label: t('homepage.degrees.collegesCount', 'Институты'), link: '/institutes' },
    { label: t('homepage.degrees.colleges', 'Колледжи'), link: '/colleges' },
    { label: t('degreePage.header.students', 'Расписание'), link: '/schedule' },
    { label: t('homepage.aboutUniversity.title', 'Об университете'), link: '/about' },
    {
      label: t('header.international', 'Международный отдел'),
      link: '/document/for-international-students',
    },
    {
      label: t('header.phd', 'PhD / Диссертации'),
      link: '/phd/submit/',
    },
  ]

  const activeIndex = headerItems.findIndex((item) => isPathActive(location.pathname, item.link))
  const pillIndex = hovered ?? activeIndex

  const LanguageSelector = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-primary/40"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-label="Выбрать язык"
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center">{currentLanguage.flag}</span>
        <span>{isMobile ? currentLanguage.shortLabel : currentLanguage.label}</span>
        <ChevronDownIcon
          size={16}
          className={`text-ink-soft transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-[1010] mt-2 min-w-[150px] rounded-2xl border border-line bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(42,33,114,0.25)]"
          >
            <ul className="space-y-0.5" role="listbox">
              {Object.entries(languageMap).map(([key, { label, shortLabel, flag }]) => (
                <li key={key} role="option" aria-selected={i18n.language === key}>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      i18n.language === key ? 'bg-primary text-white' : 'text-ink hover:bg-mist'
                    }`}
                    onClick={() => handleLanguageChange(key)}
                  >
                    <span className="flex items-center">{flag}</span>
                    <span>{isMobile ? shortLabel : label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <header
      className={`fixed left-0 top-0 z-[1000] w-full border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-line shadow-[0_10px_30px_-20px_rgba(42,33,114,0.4)]'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-6 md:px-3">
        <nav className="flex min-w-0 items-center gap-6" aria-label="Main">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="МУИТ, главная">
            <img src={IntuitLogo} alt="" className="h-10 w-auto" />
            <span className="max-w-[120px] text-[11px] font-semibold leading-[13px] text-primary lg:max-w-[150px] md:hidden">
              {t('degreePage.header.universityTitle', 'Международный Университет Инновационных Технологий')}
            </span>
          </Link>

          {/* Desktop links: one highlight pill slides to the hovered or current item */}
          <LayoutGroup id="header-nav">
            <ul
              className="hidden items-center gap-0.5 xl-max:flex lg:hidden"
              onMouseLeave={() => setHovered(null)}
            >
              {headerItems.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <li key={item.link} className="relative">
                    <Link
                      to={item.link}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => setHovered(index)}
                      onFocus={() => setHovered(index)}
                      onBlur={() => setHovered(null)}
                      className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                        isActive || hovered === index ? 'text-primary' : 'text-ink-soft'
                      }`}
                    >
                      {pillIndex === index && (
                        <motion.span
                          layoutId="header-pill"
                          aria-hidden
                          className={`absolute inset-0 rounded-full ${
                            isActive && hovered === null ? 'bg-primary/[0.09]' : 'bg-mist'
                          }`}
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 420, damping: 36 }
                          }
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="flex shrink-0 items-center gap-2" ref={dropdownRef}>
          <a
            href="/#enroll-form"
            onClick={goToApply}
            className="group hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-ink active:scale-[0.98] xl-max:inline-flex"
          >
            {applyLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <div className="hidden lg:block">
            <LanguageSelector isMobile={true} />
          </div>
          <div className="lg:hidden">
            <LanguageSelector isMobile={false} />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-primary transition-colors hover:border-primary/40 lg:flex"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile and tablet sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-16 hidden cursor-default bg-ink/45 backdrop-blur-[2px] lg:block"
            />
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white px-4 pb-6 pt-3 shadow-[0_24px_40px_-24px_rgba(42,33,114,0.4)] lg:block"
            >
              <ul className="flex flex-col">
                {headerItems.map((item, index) => {
                  const isActive = index === activeIndex
                  return (
                    <li key={item.link} className="border-b border-line last:border-b-0">
                      <Link
                        to={item.link}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex min-h-[52px] items-center justify-between gap-3 rounded-xl px-3 text-base font-medium transition-colors active:bg-mist ${
                          isActive ? 'text-primary' : 'text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive && (
                            <span aria-hidden className="h-5 w-1 rounded-full bg-green" />
                          )}
                          {item.label}
                        </span>
                        <ChevronRight size={18} className="text-ink-soft" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <a
                href="/#enroll-form"
                onClick={goToApply}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-white transition-all active:scale-[0.98]"
              >
                {applyLabel}
                <ArrowRight size={18} />
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
