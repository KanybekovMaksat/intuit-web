import Modal from '@mui/material/Modal'
import { X } from 'lucide-react'
import { t } from 'i18next'

interface MaterialModalProps {
  videoUrl?: string
  open: boolean
  handleClose: () => void
  title?: string
  subtitle?: string
}

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return undefined
  const match =
    url.match(/[?&]v=([^&#]+)/) ||
    url.match(/youtu\.be\/([^?&#]+)/) ||
    url.match(/embed\/([^?&#]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=1` : undefined
}

/*
 * MUI renders modals in a portal outside #root, and Tailwind here is scoped to #root
 * (important: '#root'), so utility classes do not apply. Styles are inline on purpose.
 */
export const MaterialModal = ({ videoUrl, open, handleClose, title, subtitle }: MaterialModalProps) => {
  const src = getYouTubeEmbedUrl(videoUrl)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          style: { backgroundColor: 'rgba(20, 18, 58, 0.78)', backdropFilter: 'blur(6px)' },
        },
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(960px, calc(100vw - 32px))',
          outline: 'none',
          fontFamily: "'Onest Variable', Onest, Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 12,
            color: '#fff',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              {t('windowPage.review', 'Отзыв')}
            </p>
            {title && (
              <h3 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ margin: '2px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Закрыть"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              flexShrink: 0,
              border: 0,
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.16)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            borderRadius: 16,
            background: '#14123A',
            boxShadow: '0 32px 80px -24px rgba(0,0,0,0.6)',
          }}
        >
          {src ? (
            <iframe
              src={src}
              title={title || 'Видео отзыв'}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
              }}
            >
              Видео недоступно
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
