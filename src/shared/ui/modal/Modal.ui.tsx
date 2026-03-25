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
        className={`p-[10px] duration-300 rounded bg-[white] min-w-[320px] md:w-[450px] flex flex-col gap-5 ${
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