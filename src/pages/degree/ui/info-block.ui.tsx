interface InfoBlockProps {
  title?: string
  description?: string
  tags: string[]
  diplomaPhoto?: string
  stats: { value: string; label: string }[]
}

const tones = [
  'bg-primary text-white',
  'bg-gray-light text-ink',
  'bg-gray-light text-ink',
  'bg-green-dark text-white',
]

export const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  description,
  tags,
  diplomaPhoto,
  stats,
}) => {
  return (
    <section className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-1">
      <div className="flex flex-col justify-between gap-10 rounded-3xl bg-gray-light p-8 sm:p-5">
        <div>
          <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-ink lg:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-1">
        {stats.map((stat, index) => {
          const withDiploma = index === 3 && diplomaPhoto
          return (
            <li
              key={`${stat.label}-${index}`}
              className={`relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-2xl p-5 ${tones[index] || tones[1]}`}
            >
              {withDiploma && (
                <img
                  src={diplomaPhoto}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-4 h-[120%] w-auto max-w-[60%] rotate-6 rounded-lg object-cover opacity-30"
                />
              )}
              <span className="relative text-[1.75rem] font-semibold leading-tight tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="relative mt-4 text-[15px] font-medium opacity-80">
                {stat.label}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default InfoBlock
