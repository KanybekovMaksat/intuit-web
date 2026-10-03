import { Box, IconButton, Typography } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

export function CustomModal({ active, setActive, children }) {
  return (
    <div
      onClick={() => setActive(false)}
      className={`fixed duration-500 z-50 h-screen w-screen bg-[black]/30 top-0 left-0 flex  pointer-events-none items-center justify-center ${
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-4 duration-300 rounded-xl bg-white w-[450px] max-w-[calc(100vw-32px)] sm:w-[calc(100vw-32px)] flex flex-col gap-5 ${
          active ? 'scale-100' : 'scale-0'
        }`}
      >
        <Box className="flex justify-between items-center">
          <Typography className='font-medium' variant="h4">Отзыв</Typography>
          <IconButton onClick={() => setActive(false)}>
            <CancelRoundedIcon />
          </IconButton>
        </Box>

        {children}
      </div>
    </div>
  )
}