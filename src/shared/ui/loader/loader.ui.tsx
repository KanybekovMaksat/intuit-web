export function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
      className="grid grid-cols-4 gap-5 py-6 xll:grid-cols-2 md:grid-cols-1"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[220px] animate-pulse rounded-2xl bg-mist motion-reduce:animate-none md:h-[140px]"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  )
}
