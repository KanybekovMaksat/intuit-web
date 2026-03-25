import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'

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
    setIsSubmitting(true)
    try {
      await axios.post(
        'https://intuit.makalabox.com/api/university/user-application/',
        {
          user: formData.name,
          phone: formData.phone,
          email: formData.email,
          slug: window.location.href,
        }
      )
      toast.success(t('homepage.enrollForm.successMessage'))
      setFormData({ name: '', phone: '', email: '' })
    } catch (error) {
      toast.error(t('homepage.enrollForm.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-blue p-5 rounded-lg w-full mt-5 ">
      <div className="flex items-center gap-5 md:flex-col">
        <div>
          <Typography
            variant="h3"
            component="h3"
            className="text-[2.5rem] font-semibold text-[white] lg:text-[40px] md:!text-[30px] mb-10"
          >
            {t('homepage.enrollForm.title')}
          </Typography>
          <span className="text-[white] text-base">
            Если вы хотите больше узнать о МУИТ или не знаете, какую программу
            обучения подобрать, оставьте заявку - и мы перезвоним
          </span>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex gap-3 md:flex-col">
              <fieldset className="my-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t('homepage.enrollForm.placeholders.name')}
                  value={formData.name}
                  onChange={handleChange}
                  className="text-base py-3 px-3 w-[320px] rounded outline-none placeholder:text-base lg:w-full md:w-full"
                />
              </fieldset>
              <fieldset className="my-5 w-[320px] md:w-full">
                <PhoneInput
                  country={'kg'}
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, phone }))
                  }
                  inputStyle={{
                    width: '100%',
                    height: '51px',
                    borderRadius: '8px',
                    paddingLeft: '48px',
                    fontSize: '16px',
                  }}
                  containerStyle={{ width: '100%' }}
                  inputClass="outline-none"
                  buttonStyle={{ border: 'none', background: 'transparent' }}
                />
              </fieldset>
            </div>

            <fieldset className="my-5">
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder={t('homepage.enrollForm.placeholders.email')}
                value={formData.email}
                onChange={handleChange}
                className="text-base py-3 px-3  rounded outline-none placeholder:text-base w-full"
              />
            </fieldset>
          </div>
          <Button
            variant="contained"
            className="shadow-none h-[51px] w-full bg-green"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('homepage.enrollForm.buttons.submitting')
              : t('homepage.enrollForm.buttons.submit')}
          </Button>
        </div>
      </div>
    </div>
  )
}
