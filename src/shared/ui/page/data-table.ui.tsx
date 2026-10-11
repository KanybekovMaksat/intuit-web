interface Column {
  key: string
  label: string
  /** Right-align numbers. */
  align?: 'left' | 'right'
}

interface DataTableProps {
  columns: Column[]
  rows: object[]
}

/** Plain table in the site's card shape. Scrolls sideways on narrow screens instead of squeezing. */
export const DataTable = ({ columns, rows }: DataTableProps) => (
  <div className="overflow-x-auto rounded-3xl border border-line bg-white">
    <table className="w-full min-w-[560px] border-collapse text-left">
      <thead>
        <tr className="bg-gray-light text-sm text-ink-soft">
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={`px-6 py-4 font-semibold sm:px-4 ${
                column.align === 'right' ? 'text-right' : ''
              }`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {rows.map((row, index) => (
          <tr key={index} className="transition-colors hover:bg-gray-light/60">
            {columns.map((column, columnIndex) => (
              <td
                key={column.key}
                className={`px-6 py-4 align-top text-[15px] leading-relaxed sm:px-4 ${
                  columnIndex === 0 ? 'whitespace-nowrap tabular-nums text-ink-soft' : 'text-ink'
                } ${column.align === 'right' ? 'text-right font-semibold tabular-nums' : ''}`}
              >
                {String((row as Record<string, unknown>)[column.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
