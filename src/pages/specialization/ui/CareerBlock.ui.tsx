import { Avatar, Card, Typography } from '@mui/material'
import { t } from 'i18next'
import { specializationTypes } from '~entities/specialization'
import { Title } from '~shared/ui/title'

export const CareerBlock = ({
  professions,
}: specializationTypes.Specialization) => {
  console.log(professions)

  return (
    <div className="my-10 rounded-xl">
      <Title>{t('specialization.professionTitle')}</Title>
      <Typography variant="body1">
        {t('specialization.professionDescription')}
      </Typography>
      <div className="flex mt-5 flex-wrap gap-10 justify-center">
        {professions.map((prof, i) => {
          return (
            <Card className=" w-[400px] rounded-xl flex flex-col items-center justify-start p-8 shadow-none bg-[#f5f5f5] ">
              <Avatar className="h-[90px] w-[90px]" src={prof.photo} />
              <Typography variant="h6" className="font-medium">
                {prof.name}
              </Typography>
              <p className="font-medium">{prof.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
