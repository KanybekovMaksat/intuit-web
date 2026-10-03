import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage, getLanguage } from '~shared/lib/i18n/i18nHelper'
import IntuitLogo from '../../assets/intuit-logo.png'
import { Link, useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import { FlagEn, FlagRu, FlagKg } from './flags'

const languageMap = {
  en: { shortLabel: 'EN', label: 'English', flag: <FlagEn /> },
  ru: { shortLabel: 'RU', label: 'Русский', flag: <FlagRu /> },
  kg: { shortLabel: 'KG', label: 'Кыргызча', flag: <FlagKg /> },
}

export const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = getLanguage()
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const LanguageSelector = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="relative border py-1 rounded-full border-gray px-3">
      <button
        type="button"
        className="flex items-center text-black text-sm font-medium hover:text-gray-600 focus:outline-none"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-label="Выбрать язык"
      >
        <span className="mr-1.5 flex items-center">{currentLanguage.flag}</span>
        <span>{isMobile ? currentLanguage.shortLabel : currentLanguage.label}</span>
        <ChevronDownIcon
          size={16}
          className={`ml-1.5 text-black/60 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 border border-gray-200 top-full mt-2 min-w-[130px] bg-white text-gray-800 rounded-lg shadow-xl z-[99999] p-1.5"
          >
            <ul className="space-y-1">
              {Object.entries(languageMap).map(([key, { label, shortLabel, flag }]) => (
                <li key={key}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      i18n.language === key
                        ? 'bg-[#00956F] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
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
    <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 w-full z-[9000] border-b border-gray/50 transition-all">
      <div className="w-full px-6 md:px-3 py-2.5">
        <nav className="flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 mr-4 group">
              <img
                src={IntuitLogo}
                alt="МУИТ Логотип"
                className="h-[46px] w-auto transition-transform group-hover:scale-105"
              />
              <p className="text-[11px] font-bold leading-[13px] max-w-[110px] text-[#2A2172]">
                {t('degreePage.header.universityTitle', 'Международный Университет Инновационных Технологий')}
              </p>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl-max:flex lg:hidden gap-1.5 items-center">
              {headerItems.map((item, index) => {
                const isActive = location.pathname === item.link
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className={`text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#2A2172] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-[#00956F] hover:text-white border border-transparent hover:border-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Controls: Language & Mobile Toggle */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            {/* Desktop Language Selector */}
            <div className="hidden lg:block">
              <LanguageSelector isMobile={true} />
            </div>
            <div className="lg:hidden">
              <LanguageSelector isMobile={false} />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="hidden lg:block">
              <IconButton
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Меню"
                className="!text-[#2A2172]"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block bg-white border-t border-gray/40 shadow-lg px-4 py-4"
          >
            <div className="flex flex-col space-y-2">
              {headerItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === item.link
                      ? 'bg-[#2A2172] text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
