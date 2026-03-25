import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const StaffButtonsSwiper = () => {
  const { t } = useTranslation()

  const buttonLabels = [
    t('homepage.staff.rectorate'),
    t('homepage.staff.directors'),
    t('homepage.staff.departmentHead'),
    t('homepage.staff.uvrDeputyDirector'),
    t('homepage.staff.professorStaff'),
  ]

  return (
    <div className="my-5 py-1 px-1 staff-buttons-swiper flex gap-2 lg:flex-col">
      {buttonLabels.map((label) => (
        <Button
          size="small"
          variant="outlined"
          className="border-blue text-blue hover:bg-blue hover:text-white"
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default StaffButtonsSwiper
