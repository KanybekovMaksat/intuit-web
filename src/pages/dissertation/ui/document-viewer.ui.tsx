import { useEffect, useRef, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ChevronLeft, ChevronRight, Minus, MoveHorizontal, Plus } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import type { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'
import 'pdfjs-dist/web/pdf_viewer.css'
import { Loader } from '~shared/ui/loader'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl
// pdf_viewer.js (UMD) берёт библиотеку из globalThis, поэтому подключаем его после регистрации
;(globalThis as unknown as { pdfjsLib: typeof pdfjsLib }).pdfjsLib = pdfjsLib
const viewerModule = import('pdfjs-dist/web/pdf_viewer')

const MIN_SCALE = 0.25
const MAX_SCALE = 4

type DocumentViewerProps = {
  url: string
}

/**
 * Просмотр PDF без скачивания и печати. Первая страница показывается сразу:
 * файл подгружается частями (Range) по мере листания, а не целиком.
 */
const DocumentViewer = ({ url }: DocumentViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<PDFViewer | null>(null)
  const fitWidthRef = useRef(true)
  const [pagesCount, setPagesCount] = useState(0)
  const [page, setPage] = useState(1)
  const [scale, setScale] = useState(1)
  const [isRendered, setRendered] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setRendered(false)
    setError(false)
    const task = pdfjsLib.getDocument({
      url,
      disableAutoFetch: true,
      disableStream: true,
      rangeChunkSize: 256 * 1024,
    })

    viewerModule.then(({ EventBus, PDFLinkService, PDFViewer: Viewer }) => {
      if (cancelled || !containerRef.current) return
      const eventBus = new EventBus()
      const linkService = new PDFLinkService({ eventBus })
      const viewer = new Viewer({
        container: containerRef.current,
        eventBus,
        linkService,
        textLayerMode: 0, // без текстового слоя: текст не выделить и не скопировать
        annotationMode: pdfjsLib.AnnotationMode.DISABLE,
      })
      linkService.setViewer(viewer)
      viewerRef.current = viewer

      eventBus.on('pagesinit', () => {
        viewer.currentScaleValue = 'page-width'
      })
      eventBus.on('pagerendered', () => setRendered(true))
      eventBus.on('pagechanging', (event: { pageNumber: number }) => setPage(event.pageNumber))
      eventBus.on('scalechanging', (event: { scale: number }) => setScale(event.scale))

      task.promise.then(
        (pdf) => {
          if (cancelled) return
          viewer.setDocument(pdf)
          linkService.setDocument(pdf)
          setPagesCount(pdf.numPages)
        },
        () => !cancelled && setError(true),
      )
    })

    return () => {
      cancelled = true
      viewerRef.current = null
      task.destroy()
    }
  }, [url])

  // При изменении размера окна страница снова вписывается по ширине, если масштаб не меняли вручную
  useEffect(() => {
    const onResize = () => {
      if (fitWidthRef.current && viewerRef.current?.pdfDocument) {
        viewerRef.current.currentScaleValue = 'page-width'
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const zoom = (factor: number) => {
    const viewer = viewerRef.current
    if (!viewer?.pdfDocument) return
    fitWidthRef.current = false
    viewer.currentScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, viewer.currentScale * factor))
  }

  const fitWidth = () => {
    if (!viewerRef.current?.pdfDocument) return
    fitWidthRef.current = true
    viewerRef.current.currentScaleValue = 'page-width'
  }

  const goTo = (pageNumber: number) => {
    const viewer = viewerRef.current
    if (!viewer?.pdfDocument) return
    viewer.currentPageNumber = Math.min(pagesCount, Math.max(1, pageNumber))
  }

  return (
    <div
      className="pdf-view-only flex h-full flex-col bg-[#eef0f4]"
      onContextMenu={(event) => event.preventDefault()}
      onCopy={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <style>{`@media print { .pdf-view-only { display: none !important; } }`}</style>

      <div className="flex items-center justify-center gap-1 border-b border-primary/10 bg-white px-2 py-1 text-sm text-primary">
        <IconButton size="small" onClick={() => goTo(page - 1)} disabled={page <= 1} aria-label="Предыдущая страница">
          <ChevronLeft size={20} />
        </IconButton>
        <span className="min-w-[88px] text-center tabular-nums">
          {pagesCount ? `${page} из ${pagesCount}` : '—'}
        </span>
        <IconButton
          size="small"
          onClick={() => goTo(page + 1)}
          disabled={!pagesCount || page >= pagesCount}
          aria-label="Следующая страница"
        >
          <ChevronRight size={20} />
        </IconButton>
        <span className="mx-2 h-5 w-px bg-primary/15" />
        <IconButton size="small" onClick={() => zoom(1 / 1.2)} aria-label="Уменьшить">
          <Minus size={18} />
        </IconButton>
        <span className="min-w-[48px] text-center tabular-nums">{Math.round(scale * 100)}%</span>
        <IconButton size="small" onClick={() => zoom(1.2)} aria-label="Увеличить">
          <Plus size={18} />
        </IconButton>
        <Tooltip title="По ширине страницы">
          <IconButton size="small" onClick={fitWidth} aria-label="По ширине страницы">
            <MoveHorizontal size={18} />
          </IconButton>
        </Tooltip>
      </div>

      <div className="relative min-h-0 flex-1">
        {/* PDFViewer требует абсолютно позиционированный контейнер с прокруткой */}
        <div ref={containerRef} className="absolute inset-0 overflow-auto">
          <div className="pdfViewer" />
        </div>
        {!isRendered && !isError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-black/60">
            Не удалось открыть документ. Закройте окно и попробуйте ещё раз.
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentViewer
