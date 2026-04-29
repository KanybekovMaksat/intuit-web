interface TitleProps extends React.PropsWithChildren {
  className?: string
}

export const Title = ({ children, className }: TitleProps) => {
  return (
    <h2 className={`mt-[80px] mb-[30px] text-[2.5rem] font-semibold text-[#333] lg:text-[40px] md:!text-[30px] ${className || ''}`}>
      {children}
    </h2>
  )
}
