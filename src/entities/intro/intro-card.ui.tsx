import { Box, Button, Typography } from '@mui/material'
import { t } from 'i18next'
import { BadgeHelp, BookCopy, BookOpen, Compass } from 'lucide-react'
import { useState } from 'react'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export const IntroCard = ({ img, description }) => {

  return (
    <>
      <section
        className=" sm:p-3 border border-[gray] sm:py-6 h-[350px] w-full bg-no-repeat  bg-cover rounded-xl flex  sm:flex-col justify-between p-10 md:bg-right text-left bg-center  "
        style={{ backgroundImage: `url(${img})` }}
      >
        <Box className="flex flex-col justify-between h-[100%]">
          <div>
          <Typography
            variant="body1"
            className="text-white text-4xl sm:text-2xl mb-4 max-w-[550px] font-bold md:text-center"
          >
            Институты университета
          </Typography>
          <Typography
            className="text-white  text-md max-w-[550px] font-bold md:text-center"
          >
           Откройте для себя все академические направления и выберите то, что подходит именно вам
          </Typography>
          </div>
          <Button
            variant="contained"
            size="large"
            className="bg-blue flex items-center gap-1 shadow-none self-start md:mx-auto"
          >
           Помочь с выбором
           <BadgeHelp />
          </Button>
        </Box>

        <BookCopy color='white' size={300} className='sm:hidden opacity-75 relative bottom-[-20px] right-[-80px]' />


      </section>
    </>
  )
}
