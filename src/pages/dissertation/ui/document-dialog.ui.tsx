import { lazy, Suspense } from 'react'
import { Dialog, IconButton } from '@mui/material'
import { X } from 'lucide-react'
import { dissertationTypes } from '~entities/dissertation'
import { Loader } from '~shared/ui/loader'

// Просмотрщик PDF тяжёлый — грузим его только при открытии документа
const DocumentViewer = lazy(() => import('./document-viewer.ui'))

type DocumentDialogProps = {
  document: dissertationTypes.DissertationDocument | null
  onClose: () => void
}

export const DocumentDialog = ({ document: doc, onClose }: DocumentDialogProps) => (
  // Портал внутри #root: Tailwind в проекте подключён с `important: "#root"`
  <Dialog
    open={Boolean(doc)}
    onClose={onClose}
    fullScreen
    container={() => document.getElementById('root')}
    // Выше фиксированной шапки сайта (z-index 90000)
    sx={{ zIndex: 100000 }}
  >
    {doc && (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-primary/10 px-4 py-2">
          <div className="min-w-0">
            <div className="truncate font-semibold text-primary">{doc.title || doc.kindDisplay}</div>
            <div className="text-xs text-black/50">Документ доступен только для просмотра</div>
          </div>
          <IconButton onClick={onClose} aria-label="Закрыть">
            <X size={22} />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1">
          <Suspense fallback={<Loader />}>
            <DocumentViewer url={doc.viewUrl} />
          </Suspense>
        </div>
      </div>
    )}
  </Dialog>
)
