import { ChevronDown, FileText, ArrowUpRight } from 'lucide-react'
import Fancybox from '~shared/ui/fancybox/Fancybox'

export type DocumentItem = { name?: string; document: string }
export type DocumentGroup = { name: string; documentCollectionItems: DocumentItem[] }

interface DocumentGroupsProps {
  groups: DocumentGroup[]
  /** Open the first group on load. */
  openFirst?: boolean
}

const fileKind = (href: string) => {
  const ext = href.split('?')[0].split('.').pop()?.toLowerCase() || ''
  if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) return 'IMG'
  if (ext.length > 0 && ext.length <= 4) return ext.toUpperCase()
  return 'FILE'
}

/**
 * Collapsible document groups. Native details/summary: keyboard and screen
 * reader behaviour for free, no height animation to jank on mobile.
 */
export const DocumentGroups = ({ groups, openFirst }: DocumentGroupsProps) => {
  if (!groups?.length) return null

  return (
    <Fancybox options={{ Carousel: { infinite: false } }}>
      <div className="grid gap-3">
        {groups.map((group, groupIndex) => (
          <details
            key={`${group.name}-${groupIndex}`}
            open={openFirst && groupIndex === 0}
            className="group overflow-hidden rounded-2xl border border-line bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-ink transition-colors duration-200 hover:bg-gray-light sm:px-4 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 items-center gap-3">
                <span className="break-words">{group.name}</span>
                <span className="shrink-0 rounded-full bg-gray-light px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                  {group.documentCollectionItems?.length || 0}
                </span>
              </span>
              <ChevronDown
                size={20}
                aria-hidden
                className="shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
              />
            </summary>

            <ul className="grid gap-1 border-t border-line p-3">
              {group.documentCollectionItems?.map((doc, index) => (
                <li key={index}>
                  <a
                    data-fancybox="gallery"
                    href={doc.document}
                    className="group/doc flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-gray-light"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText size={20} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 break-words">
                      {doc.name || `Документ ${index + 1}`}
                    </span>
                    <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
                      {fileKind(doc.document)}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-ink-soft transition-transform duration-200 group-hover/doc:-translate-y-0.5 group-hover/doc:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </Fancybox>
  )
}
