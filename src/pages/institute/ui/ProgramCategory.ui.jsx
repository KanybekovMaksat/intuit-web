import { Typography } from '@mui/material';
import React from 'react';
import { ProfessionCard } from '~entities/profession';
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
];

const ProgramCategory = () => {
  return (
    <div>
      <Typography variant="h3" className="font-semibold my-10">
        Программа обучения
      </Typography>
      <div className="flex flex-wrap  gap-2 lg:justify-center">
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
  );
};

export default ProgramCategory;
