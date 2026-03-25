import { Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export function Loader() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-[400px]">
      <CircularProgress className="text-green" />
      <Typography variant="h6">Загрузка</Typography>
    </div>
  )
}
