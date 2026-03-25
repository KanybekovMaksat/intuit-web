import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import Modal from '@mui/material/Modal'
import { t } from 'i18next'

export const MaterialModal = ({ videoUrl, open, handleClose }) => {
  const getYouTubeEmbedUrl = (url) => {
    if (url) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0`
        : 'https://www.youtube.com/watch?v=2Y-Xa1h77KI'
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)', // Черный с прозрачностью 50%
          border: 'none',
        },
      }}
    >
      <Box
        sx={{
          width: '800px', // Фиксированная ширина модального окна
          height: '500px', // Высота соответствует соотношению 16:9
          maxWidth: '100%', // Чтобы не выходить за границы экрана
          margin: '50px auto',
          padding: 3,
          background: 'white',
        }}
      >
        <Box
          className="flex justify-between items-center w-full"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography className="font-medium" variant="h4">
            {t("windowPage.review")}
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon />
          </IconButton>
        </Box>
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          title="YouTube video player"
          frameBorder="0"
          style={{
            width: '100%',
            height: '80%',
            borderRadius: '8px', // Закруглённые углы
            marginTop: '30px',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>
    </Modal>
  )
}
