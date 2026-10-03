import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { API_URL } from '~shared/lib/api/apiClient'

export const EnrollForm = () => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.warning(t('homepage.enrollForm.errors.nameRequired', 'Пожалуйста, укажите ваше имя'))
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      toast.warning(t('homepage.enrollForm.errors.phoneRequired', 'Пожалуйста, укажите контактный телефон'))
      return
    }

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
      toast.success(t('homepage.enrollForm.successMessage', 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'))
      setFormData({ name: '', phone: '', email: '' })
    } catch (error) {
      toast.error(t('homepage.enrollForm.errorMessage', 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="enroll-form" className="bg-[#2A2172] p-8 md:p-5 rounded-2xl w-full my-8 text-white shadow-xl">
      <div className="flex items-center gap-8 lg:flex-col lg:items-stretch">
        <div className="flex-1">
          <Typography
            variant="h3"
            component="h3"
            className="text-[2.25rem] font-bold text-white lg:text-[32px] md:!text-[24px] mb-4"
          >
            {t('homepage.enrollForm.title', 'Остались вопросы? Поможем с выбором!')}
          </Typography>
          <span className="text-white/80 text-sm md:text-base leading-relaxed block max-w-xl">
            {t(
              'homepage.enrollForm.description',
              'Если вы хотите больше узнать о МУИТ или не знаете, какую программу обучения подобрать, оставьте заявку — и наш специалист свяжется с вами для консультации.'
            )}
          </span>
        </div>
        <div className="w-full max-w-md">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('homepage.enrollForm.placeholders.name', 'Ваше имя *')}
              value={formData.name}
              onChange={handleChange}
              className="text-sm py-3 px-4 w-full rounded-lg text-gray-900 bg-white border border-transparent focus:border-[#00956F] outline-none placeholder:text-gray-400"
            />

            <div className="w-full">
              <PhoneInput
                country={'kg'}
                value={formData.phone}
                onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                inputStyle={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '8px',
                  paddingLeft: '48px',
                  fontSize: '14px',
                  color: '#111827',
                }}
                containerStyle={{ width: '100%' }}
                inputClass="outline-none"
                buttonStyle={{ border: 'none', background: 'transparent' }}
              />
            </div>

            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('homepage.enrollForm.placeholders.email', 'Email (необязательно)')}
              value={formData.email}
              onChange={handleChange}
              className="text-sm py-3 px-4 w-full rounded-lg text-gray-900 bg-white border border-transparent focus:border-[#00956F] outline-none placeholder:text-gray-400"
            />

            <Button
              variant="contained"
              className="!shadow-none !h-[48px] !w-full !bg-[#00956F] hover:!bg-[#007f5e] !text-white !font-bold !rounded-lg !capitalize !mt-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t('homepage.enrollForm.buttons.submitting', 'Отправка...')
                : t('homepage.enrollForm.buttons.submit', 'Оставить заявку')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
