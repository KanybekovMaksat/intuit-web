import { Avatar, Card, Typography } from '@mui/material'
import { Feedback } from '../feedback.types'

export const FeedbackCard = ({ name, description, photo }: Feedback) => {
  return (
    <Card className="p-4 flex flex-col gap-10 bg-[#ECEDF0]  rounded-bl-none justify-between  shadow-none">
      <div className="flex items-center gap-3">
        <Avatar alt="Remy Sharp" src={photo} />
        <div>
          <Typography variant="h5" className="font-medium text-[18px] leading-3">
            {name}{' '}
          </Typography>
          <Typography variant="h6" className='text-[16px] font-normal'>Факультет юриспруденции</Typography>
        </div>
      </div>
      <Typography variant="body1" className="text-sm">
        {description}
      </Typography>
    </Card>
  )
}
