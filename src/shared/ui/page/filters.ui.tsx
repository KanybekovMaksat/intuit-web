import { Search, X, ChevronDown } from 'lucide-react'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

/** Pill search field with a clear button. */
export const SearchField = ({ value, onChange, placeholder }: SearchFieldProps) => (
  <label className="relative block min-w-0 flex-1">
    <span className="sr-only">{placeholder}</span>
    <Search
      size={18}
      aria-hidden
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
    />
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-11 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
    />
    {value && (
      <button
        type="button"
        aria-label="Очистить"
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gray-light hover:text-ink"
      >
        <X size={16} aria-hidden />
      </button>
    )}
  </label>
)

interface SelectFieldProps {
  value: string
  onChange: (value: string) => void
  label: string
  options: { value: string; label: string }[]
  className?: string
}

/** Native select in a pill: opens the platform picker, works with keyboard and screen readers. */
export const SelectField = ({ value, onChange, label, options, className }: SelectFieldProps) => (
  <label className={`relative block ${className || ''}`}>
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full appearance-none rounded-full border border-line bg-white pl-5 pr-11 text-[15px] font-medium text-ink outline-none transition-colors hover:border-primary/40 focus:border-primary"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={18}
      aria-hidden
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft"
    />
  </label>
)

interface FilterSummaryProps {
  text: string
  canReset: boolean
  onReset: () => void
}

/** Result count and a reset button under the filters. */
export const FilterSummary = ({ text, canReset, onReset }: FilterSummaryProps) => (
  <div className="mt-4 flex min-h-[28px] items-center justify-between gap-4">
    <p className="text-sm text-ink-soft" aria-live="polite">
      {text}
    </p>
    {canReset && (
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-light"
      >
        <X size={14} aria-hidden />
        Сбросить фильтры
      </button>
    )}
  </div>
)
