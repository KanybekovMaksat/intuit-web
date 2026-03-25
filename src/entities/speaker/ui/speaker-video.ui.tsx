import { Box, Button, Typography } from '@mui/material'
import { PlayCircleFilledRounded } from '@mui/icons-material/'
import { MaterialModal } from '~shared/ui/modal'
import { useState } from 'react'

export const SpeakerVideo = ({ name, description, preview, videoUrl }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Box
        className="flex flex-col justify-between bg-cover bg-no-repeat bg-center rounded-2xl "
        sx={{
          backgroundImage: `url("${preview}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '281px', // Высота соответствует соотношению 16:9
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={handleOpen} // Используем handleOpen из пропсов
      >
        <Button
          onClick={(e) => {
            e.stopPropagation()
            handleOpen() // Используем handleOpen из пропсов
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
          }}
        >
          <PlayCircleFilledRounded className="text-green" fontSize="large" />
        </Button>
        <Box
          className="backdrop-blur-md p-3"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Typography
            variant="body1"
            className="font-bold"
            sx={{ color: 'black' }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            className="font-medium"
            sx={{ color: 'black' }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <MaterialModal
        videoUrl={videoUrl}
        handleClose={handleClose}
        open={open}
      ></MaterialModal>
    </>
  )
}
