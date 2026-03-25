import { Button, Typography } from '@mui/material'
import Select from 'react-select'
import { ProfessionCard } from '~entities/profession'
import { useTranslation } from 'react-i18next' // импортируем хук для локализации

const options = [
  { value: 'chocolate', label: 'Бакалавриат' },
  { value: 'strawberry', label: 'Магистратура' },
  { value: 'vanilla', label: 'Аспирантура' },
  { value: 'vanilla', label: 'Колледж' },
  { value: 'vanilla', label: 'Курсы' },
]

const professions = [
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет информационных технологий',
    title: 'Программист',
    url: '/specialization/programmer',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Институт экономики и менеджмента',
    title: 'Менеджмент в инновационной деятельности',
    url: '/specialization/economist',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет инженерии',
    title: 'Инженер',
    url: '/specialization/engineer',
  },
  {
    degree: 'Магистратура',
    faculties: 'Факультет права',
    title: 'Юрист',
    url: '/specialization/lawyer',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет медицины',
    title: 'Врач',
    url: '/specialization/doctor',
  },
]

export const ProgramCategory = () => {
  const { t } = useTranslation() 

  return (
    <div className="my-20  rounded-lg">
      <Typography variant="h3" component="div" className="font-semibold">
        {t('homepage.degrees.programs')} 
      </Typography>
      <div>
        <div className="flex gap-10 my-5 lg:flex-col lg:items-center">
          <Select
            options={options}
            placeholder={t('homepage.degrees.selectDegreePlaceholder')}
            className="w-full"
          />
          <Button
            variant="contained"
            className="shadow-none bg-blue px-10 w-[350px] lg:w-full"
          >
            {t('homepage.buttons.applyButton')} 
          </Button>
        </div>
        <div className="flex flex-wrap   gap-10 lg:justify-center">
          {professions.map((profession, index) => (
            <ProfessionCard
              key={index}
              degree={profession.degree}
              faculties={profession.faculties}
              title={profession.title}
              url={profession.url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
