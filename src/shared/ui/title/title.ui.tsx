export const Title = ({ children }: React.PropsWithChildren) => {
  return (
    <h2 className="mt-[80px] mb-[30px] text-[2.5rem] font-semibold text-[#333] lg:text-[40px] md:!text-[30px]">
      {children}
    </h2>
  )
}
