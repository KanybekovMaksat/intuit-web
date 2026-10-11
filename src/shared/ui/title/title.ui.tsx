interface TitleProps extends React.PropsWithChildren {
  className?: string
}

export const Title = ({ children, className }: TitleProps) => {
  return (
    <h2
      className={`mt-14 mb-7 text-[2.5rem] font-semibold tracking-tight text-ink lg:text-[36px] md:!text-[28px] sm:!text-[24px] sm:mt-12 sm:mb-5 leading-[1.1] break-words text-balance ${className || ''}`}
    >
      {children}
    </h2>
  )
}

interface SectionHeaderProps {
  title: React.ReactNode
  action?: React.ReactNode
  className?: string
}

/** Section heading with an optional action on the right. No eyebrow labels. */
export const SectionHeader = ({ title, action, className }: SectionHeaderProps) => (
  <div
    className={`mb-8 flex items-end justify-between gap-6 md:flex-col md:items-start md:gap-4 ${className || ''}`}
  >
    <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink text-balance lg:text-4xl md:!text-[28px] sm:!text-2xl">
      {title}
    </h2>
    {action}
  </div>
)
