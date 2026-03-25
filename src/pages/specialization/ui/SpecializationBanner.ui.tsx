import { Breadcrumbs, Card, Typography, Link } from '@mui/material'
import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'

export const SpecializationBanner = ({
  title,
  studyPeriod,
  trainingForm,
  diploma,
  photo,
  educationLevel,
  phoneNumber,
  contractPrice,
}: specializationTypes.Specialization) => {
  return (
    <div className="relative min-h-[400px] flex rounded-2xl overflow-hidden md:flex-col-reverse">
      {/* Левая часть с градиентом */}
      <div
        className="w-1/2 p-10 flex flex-col justify-between relative z-10 md:w-full"
        style={{
          background:
            'linear-gradient(175deg, rgba(42,33,115,1) 0%, rgba(0,149,111,1) 100%)',
        }}
      >
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="white" href="/">
              {t('specialization.home')}
            </Link>
            <Typography color="white">{title}</Typography>
          </Breadcrumbs>
          <Typography
            variant="h1"
            component="h1"
            className="max-w-[600px] text-[40px] font-medium mt-3 text-white"
          >
            {title}
          </Typography>
        </div>

        <div className="flex gap-5 flex-wrap mt-10">
          <Card className="shadow-none p-5 rounded-2xl bg-white/90">
            <p>{t('specialization.level')}</p>
            <Typography variant="h6" className="font-semibold">
              {educationLevel[0]}
            </Typography>
          </Card>
          <Card className="shadow-none p-5 rounded-2xl bg-white/90">
            <p>{t('specialization.studyDuration')}</p>
            <Typography variant="h6" className="font-semibold">
              {studyPeriod}
            </Typography>
          </Card>
          <Card className="shadow-none p-5 rounded-2xl bg-white/90">
            <p>{t('specialization.format')}</p>
            <Typography variant="h6" className="font-semibold">
              {trainingForm}
            </Typography>
          </Card>
          <Card className="shadow-none p-5 rounded-2xl bg-white/90">
            <p>{t('specialization.result')}</p>
            <Typography variant="h6" className="font-semibold">
              {diploma}
            </Typography>
          </Card>
          {phoneNumber && (
            <Card className="shadow-none p-5 rounded-2xl bg-white/90">
              <p>Номер Телефона</p>
              <Typography variant="h6" className="font-semibold text-[18px]">
                {phoneNumber}
              </Typography>
            </Card>
          )}
          {contractPrice && (
            <Card className="shadow-none p-5 rounded-2xl bg-white/90">
              <p>Стоимость Контракта</p>
              <Typography variant="h6" className="font-semibold text-[18px]">
                {contractPrice}
              </Typography>
            </Card>
          )}
        </div>
      </div>

      {/* Правая часть с фото на фоне */}
      <div
        className="w-1/2 bg-cover bg-center md:w-full md:h-[400px]"
        style={{
          backgroundImage: `url(${photo})`,
        }}
      >
        {/* Можешь раскомментировать блок ниже, если хочешь затемнение поверх фото */}
        {/* <div className="w-full h-full bg-black/30" /> */}
      </div>
    </div>
  )
}
