import { Typography } from '@mui/material';
import { facultyQueries } from '~entities/faculties';
import { IntroCard } from '~entities/intro';
import { EnrollForm } from '~widgets/enroll-form';
import { FacultyCard } from '~widgets/faculty-card';
import { OpportunitiesList } from '~widgets/opportunities-list';
import intro from './img/intro.png';
import { t } from 'i18next';
import { Loader } from '~shared/ui/loader';
import { getApiList } from '~shared/lib/api/getApiList';
import { FacultySchema } from '~entities/faculties/faculty.types';

export const InstitutesPage = () => {
  const {
    data: facultyData,
    isLoading,
    isError,
  } = facultyQueries.useGetFaculties();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>{t('loading.error')}</div>;
  }

  const faculties = getApiList<FacultySchema>(facultyData?.data);

  return (
    <div className="my-5 mb-10">
      <IntroCard
        title={t('institutesPage.introCard.title')}
        description={t('institutesPage.introCard.description')}
        img="/bg.png"
      />
      <div className="my-5 w-full">
        <div className="grid md:grid-cols-1 grid-cols-4 gap-5 my-10 w-full">
          {faculties.map((institute, index) => (
            <FacultyCard
              key={index}
              slug={institute.slug}
              instituteName={institute.subtitle}
              programCount={institute.programCount}
              icon={institute.icon}
            />
          ))}
        </div>
      </div>
      <OpportunitiesList />
      <EnrollForm />
    </div>
  );
};
