import { FileText, ArrowUpRight } from 'lucide-react'

interface FileCardProps {
  title: string
  href: string
}

const kind = (href: string) => {
  const ext = href.split('?')[0].split('.').pop()?.toLowerCase() || ''
  return ext.length > 0 && ext.length <= 4 ? ext.toUpperCase() : 'FILE'
}

/** One document as a tile. Wrap a list of these in `Fancybox` for the viewer. */
export const FileCard = ({ title, href }: FileCardProps) => (
  <a
    href={href}
    data-fancybox="gallery"
    className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(42,33,114,0.35)]"
  >
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <FileText size={22} aria-hidden />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[15px] font-semibold leading-snug text-ink break-words">
        {title}
      </span>
      <span className="mt-2 inline-block rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
        {kind(href)}
      </span>
    </span>
    <ArrowUpRight
      size={18}
      aria-hidden
      className="mt-1 shrink-0 text-ink-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  </a>
)
