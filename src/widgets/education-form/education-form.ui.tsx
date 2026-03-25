import { useTranslation } from 'react-i18next'
import { EducationFormCard } from './ui/education-form-card.ui'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import { Title } from '~shared/ui/title'

export const EducationForm = () => {
  const { t } = useTranslation()

  return (
    <section className="my-10">
      <Title>{t('homepage.studyForms')}</Title>

      <div className="relative w-full h-[250px] lg:h-[200px]">
        <div className="absolute top-0 left-0 w-full h-full">
          <EducationFormCard
            title={t('homepage.education-form.title')}
            text={t('homepage.education-form.text')}
            icon={MenuBookOutlinedIcon}
            direction="top-left"
            bgColor="bg-blue"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <EducationFormCard
            title={t('homepage.education-form.secondTitle')}
            text={t('homepage.education-form.secondText')}
            icon={BuildOutlinedIcon}
            direction="bottom-right"
            bgColor="bg-green"
          />
        </div>
      </div>
    </section>
  )
}
