import { Partner } from '../partner.types'

export const PartnerCard = ({ logo, title }: Partner) => {
  return (
    <div className="mx-2 flex h-20 min-w-60 max-w-[360px] items-center gap-3 rounded-2xl border border-line bg-white px-5">
      <img src={logo} alt="" className="h-11 w-11 shrink-0 rounded-full object-contain" />
      <span className="text-[13px] font-semibold leading-snug text-ink">{title}</span>
    </div>
  )
}
