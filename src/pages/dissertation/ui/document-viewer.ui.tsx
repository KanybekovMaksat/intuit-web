import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin, ToolbarSlot } from '@react-pdf-viewer/default-layout'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const Hidden = () => <></>

// Режим «только просмотр»: убираем из панели скачивание, печать, открытие файла
const viewOnlyToolbar = (slot: ToolbarSlot): ToolbarSlot => ({
  ...slot,
  Download: Hidden,
  DownloadMenuItem: Hidden,
  Print: Hidden,
  PrintMenuItem: Hidden,
  Open: Hidden,
  OpenMenuItem: Hidden,
  SwitchTheme: Hidden,
  SwitchThemeMenuItem: Hidden,
  ShowProperties: Hidden,
  ShowPropertiesMenuItem: Hidden,
  SwitchSelectionMode: Hidden,
  SwitchSelectionModeMenuItem: Hidden,
})

type DocumentViewerProps = {
  url: string
}

const DocumentViewer = ({ url }: DocumentViewerProps) => {
  const layout = defaultLayoutPlugin({
    // Оставляем только миниатюры страниц (без вкладки вложений)
    sidebarTabs: (tabs) => tabs.slice(0, 1),
    toolbarPlugin: {
      printPlugin: { enableShortcuts: false },
      openPlugin: { enableShortcuts: false },
    },
    renderToolbar: (Toolbar) => (
      <Toolbar>{layout.toolbarPluginInstance.renderDefaultToolbar(viewOnlyToolbar)}</Toolbar>
    ),
  })

  return (
    <div
      className="pdf-view-only h-full"
      onContextMenu={(event) => event.preventDefault()}
      onCopy={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <style>{`
        .pdf-view-only .rpv-core__text-layer { user-select: none; }
        @media print { .pdf-view-only { display: none !important; } }
      `}</style>
      <Worker workerUrl={pdfWorkerUrl}>
        <Viewer
          fileUrl={url}
          plugins={[layout]}
          defaultScale={SpecialZoomLevel.PageWidth}
          theme="light"
        />
      </Worker>
    </div>
  )
}

export default DocumentViewer
