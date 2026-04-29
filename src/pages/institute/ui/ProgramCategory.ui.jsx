import { Typography } from '@mui/material';
import React from 'react';
import { ProfessionCard } from '~entities/profession';
import { motion } from 'framer-motion';

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
];

const ProgramCategory = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-20">
            <span className="text-green font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
                SPECIALIZATION
            </span>
            <Typography variant="h3" className="text-5xl lg:text-7xl font-black text-primary tracking-tighter uppercase italic leading-[0.9]">
                Программы обучения
            </Typography>
        </div>

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
  );
};

export default ProgramCategory;
