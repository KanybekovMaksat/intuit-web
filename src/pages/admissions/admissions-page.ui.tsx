import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '~shared/ui/page'

export const AdmissionsPage = () => {
  return (
    <div className="mb-20">
      <PageHero
        compact
        title="Приёмная комиссия 2025"
        subtitle="Сроки приёма, документы и порядок зачисления собраны на странице для абитуриентов."
        actions={
          <Link
            to="/applicants"
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            Абитуриентам
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />
    </div>
  )
}
