import { Button } from '@mui/material'
import Select from 'react-select'
import { ProfessionCard } from '~entities/profession'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const options = [
  { value: 'bachelor', label: 'Бакалавриат' },
  { value: 'master', label: 'Магистратура' },
  { value: 'phd', label: 'Аспирантура' },
  { value: 'college', label: 'Колледж' },
  { value: 'courses', label: 'Курсы' },
]

const professions = [
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет информационных технологий',
    title: 'Программист',
    url: 'programmer',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Институт экономики и менеджмента',
    title: 'Менеджмент в инновационной деятельности',
    url: 'economist',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет инженерии',
    title: 'Инженер',
    url: 'engineer',
  },
  {
    degree: 'Магистратура',
    faculties: 'Факультет права',
    title: 'Юрист',
    url: 'lawyer',
  },
  {
    degree: 'Бакалавриат',
    faculties: 'Факультет медицины',
    title: 'Врач',
    url: 'doctor',
  },
]

export const ProgramCategory = () => {
  const { t } = useTranslation() 

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-xl">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-green font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
             >
                {t('homepage.degrees.academicPrograms') || 'Specialization'}
             </motion.span>
             <h2 className="text-5xl lg:text-7xl font-black text-primary tracking-tighter uppercase italic leading-[0.9]">
               {t('homepage.degrees.programs')} 
             </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
            <Select
              options={options}
              placeholder={t('homepage.degrees.selectDegreePlaceholder')}
              className="w-full md:w-[320px] z-30"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '100px',
                  padding: '8px 16px',
                  borderColor: 'rgba(42, 33, 114, 0.08)',
                  boxShadow: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  '&:hover': { borderColor: '#2A2172' }
                })
              }}
            />
            <Button
              className="bg-green text-white font-black uppercase text-[10px] tracking-widest px-12 py-5 rounded-full h-[56px] shadow-xl shadow-green/20 hover:bg-green/90 w-full md:w-auto transition-all hover:scale-105"
            >
              {t('homepage.buttons.applyButton')} 
            </Button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {professions.map((profession, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <ProfessionCard
                degree={profession.degree}
                faculties={profession.faculties}
                title={profession.title}
                url={profession.url}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
