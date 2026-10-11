import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '~shared/lib/api/apiClient'

export interface ContactInfo {
  address: string
  admissionOfficePhone: string
  facebook: string
  hoursSaturday: string
  hoursSunday: string
  hoursWeekdays: string
  id: number
  instagram: string
  receptionPhone: string
  telegram: string
  whatsapp: string
  youtube: string
}

export const defaultContactInfo: ContactInfo = {
  address: 'г. Бишкек, ул. Горького 1/17',
  admissionOfficePhone: '+996 (312) 54-32-10',
  facebook: 'https://www.facebook.com/intuit.kg',
  hoursSaturday: '09:00 - 15:00',
  hoursSunday: 'Выходной',
  hoursWeekdays: ' 08:30 - 17:30',
  id: 1,
  instagram: 'https://www.instagram.com/intuit.kg',
  receptionPhone: '+996 (312) 54-32-11',
  telegram: 'https://t.me/intuit_kg',
  whatsapp: 'https://wa.me/996555123456',
  youtube: 'https://www.youtube.com/@intuit',
}

/** The API sometimes returns a phone number or a handle instead of a full link. */
function toTelegramUrl(value: string) {
  const v = value.trim()
  if (!v || /^https?:\/\//i.test(v)) return v
  if (/^\+?[\d\s()-]+$/.test(v)) return `https://t.me/+${v.replace(/\D/g, '')}`
  return `https://t.me/${v.replace(/^@/, '')}`
}

function toWhatsappUrl(value: string) {
  const v = value.trim()
  if (!v || /^https?:\/\//i.test(v)) return v
  return `https://wa.me/${v.replace(/\D/g, '')}`
}

/** Contact details of the university. One shared request for footer and forms; defaults while loading or on error. */
export function useContactInfo(): ContactInfo {
  const { data } = useQuery({
    queryKey: ['university-info'],
    queryFn: async () => {
      const url = `${API_URL || 'https://intuit.makalabox.com'}/api/university/university-info/1/`
      const res = await axios.get<ContactInfo>(url)
      return res.data
    },
    staleTime: 10 * 60 * 1000,
    retry: false,
  })
  const merged = { ...defaultContactInfo, ...(data || {}) }
  return {
    ...merged,
    telegram: toTelegramUrl(merged.telegram || ''),
    whatsapp: toWhatsappUrl(merged.whatsapp || ''),
  }
}
