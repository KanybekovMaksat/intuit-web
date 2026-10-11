import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CheckCircle2, Clock, Loader2, Phone, Send } from 'lucide-react'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { API_URL } from '~shared/lib/api/apiClient'
import { useContactInfo } from '~entities/university-info'

const fieldClass =
  'h-12 w-full rounded-xl border border-line bg-paper px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary focus:bg-white'

const channelClass =
  'inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors duration-200 hover:bg-white hover:text-primary'

export const EnrollForm = () => {
  const { t } = useTranslation()
  const contacts = useContactInfo()

  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') setErrors((prev) => ({ ...prev, name: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: { name?: string; phone?: string } = {}
    if (!formData.name.trim()) {
      nextErrors.name = t('homepage.enrollForm.errors.nameRequired', 'Пожалуйста, укажите ваше имя')
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      nextErrors.phone = t(
        'homepage.enrollForm.errors.phoneRequired',
        'Пожалуйста, укажите контактный телефон'
      )
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.phone) return

    setIsSubmitting(true)
    try {
      const endpoint = API_URL
        ? `${API_URL}/api/university/user-application/`
        : 'https://intuit.makalabox.com/api/university/user-application/'

      await axios.post(endpoint, {
        user: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        slug: window.location.pathname,
      })
      setFormData({ name: '', phone: '', email: '' })
      setIsSent(true)
      // Move focus to the confirmation so screen readers announce it
      window.setTimeout(() => successRef.current?.focus(), 50)
    } catch (error) {
      toast.error(
        t(
          'homepage.enrollForm.errorMessage',
          'Не удалось отправить заявку. Пожалуйста, попробуйте позже.'
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const phoneHref = `tel:${contacts.admissionOfficePhone.replace(/[^+\d]/g, '')}`

  return (
    <section
      id="enroll-form"
      className="relative my-12 overflow-hidden rounded-3xl bg-primary px-12 py-12 xll:px-8 md:px-5 md:py-8 sm:rounded-2xl"
      style={{
        backgroundImage:
          'radial-gradient(45% 80% at 10% 100%, rgba(0,149,111,0.45) 0%, rgba(0,149,111,0) 70%)',
      }}
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_minmax(0,460px)] items-start gap-16 lg:grid-cols-1 lg:gap-8">
        <div className="pt-2">
          <h2 className="max-w-[16ch] text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-white text-balance lg:text-[2rem] md:text-[1.65rem]">
            {t('homepage.enrollForm.title', 'Остались вопросы? Поможем с выбором!')}
          </h2>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/80">
            {t(
              'homepage.enrollForm.description',
              'Если вы хотите больше узнать о МУИТ или не знаете, какую программу обучения подобрать, оставьте заявку, и наш специалист свяжется с вами для консультации.'
            )}
          </p>

          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-sm text-white/65">
              {t('homepage.enrollForm.direct', 'Можно связаться напрямую')}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={phoneHref} className={channelClass}>
                <Phone size={16} aria-hidden />
                {contacts.admissionOfficePhone}
              </a>
              {contacts.telegram && (
                <a
                  href={contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={channelClass}
                >
                  Telegram
                </a>
              )}
              {contacts.whatsapp && (
                <a
                  href={contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={channelClass}
                >
                  WhatsApp
                </a>
              )}
            </div>
            {contacts.hoursWeekdays && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/65">
                <Clock size={15} aria-hidden />
                {t('homepage.enrollForm.hours', 'Пн-Пт')} {contacts.hoursWeekdays.trim()}
              </p>
            )}
          </div>
        </div>

        {isSent ? (
          <div
            role="status"
            className="flex flex-col items-start gap-4 rounded-2xl bg-white p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] sm:p-5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-dark text-white">
              <CheckCircle2 size={26} aria-hidden />
            </span>
            <h3
              ref={successRef}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight text-ink outline-none"
            >
              {t('homepage.enrollForm.successTitle', 'Заявка отправлена')}
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              {t(
                'homepage.enrollForm.successMessage',
                'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.'
              )}
            </p>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="mt-2 inline-flex h-11 items-center rounded-full border border-line px-5 text-[15px] font-semibold text-ink transition-colors hover:border-primary"
            >
              {t('homepage.enrollForm.another', 'Отправить ещё одну заявку')}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl bg-white p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] sm:p-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="enroll-name" className="text-sm font-medium text-ink">
                {t('homepage.enrollForm.placeholders.name', 'Ваше имя *')}
              </label>
              <input
                id="enroll-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'enroll-name-error' : undefined}
                className={`${fieldClass} ${errors.name ? '!border-red-600' : ''}`}
              />
              {errors.name && (
                <p id="enroll-name-error" className="text-sm text-red-700">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="enroll-phone" className="text-sm font-medium text-ink">
                {t('homepage.enrollForm.placeholders.phone', 'Номер телефона *')}
              </label>
              <PhoneInput
                country={'kg'}
                value={formData.phone}
                onChange={(phone) => {
                  setFormData((prev) => ({ ...prev, phone }))
                  setErrors((prev) => ({ ...prev, phone: undefined }))
                }}
                inputProps={{
                  id: 'enroll-phone',
                  name: 'phone',
                  autoComplete: 'tel',
                  'aria-invalid': !!errors.phone,
                }}
                containerClass={`enroll-phone ${errors.phone ? 'has-error' : ''}`}
              />
              {errors.phone && <p className="text-sm text-red-700">{errors.phone}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="enroll-email" className="text-sm font-medium text-ink">
                {t('homepage.enrollForm.placeholders.email', 'Email (необязательно)')}
              </label>
              <input
                id="enroll-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-green-dark text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden />
                  {t('homepage.enrollForm.buttons.submitting', 'Отправка...')}
                </>
              ) : (
                <>
                  {t('homepage.enrollForm.buttons.submit', 'Оставить заявку')}
                  <Send size={16} aria-hidden />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
