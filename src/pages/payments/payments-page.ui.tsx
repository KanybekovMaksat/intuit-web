import { t } from 'i18next'
import { useState } from 'react'
import { PageHero, DataTable } from '~shared/ui/page'

type Row = { code: string; program: string; duration: string; fee: string }

export const PaymentsPage = () => {
  const [category, setCategory] = useState('МУИТ')

  const categories = [
    { value: 'МУИТ', label: t('paymentsPage.MUIT') },
    { value: 'КОМТЕХНО И КИТЭ', label: t('paymentsPage.KOMTEKHNO_KITE') },
    { value: 'КР', label: t('paymentsPage.KR') },
  ]

  // Placeholder rows: replace with real tariffs or an API response
  const tableData: Record<string, Row[]> = {
    МУИТ: [{ code: '71200', program: 'Program A', duration: '4 years', fee: '10000' }],
    'КОМТЕХНО И КИТЭ': [{ code: '71201', program: 'Program B', duration: '3 years', fee: '9000' }],
    КР: [{ code: '71202', program: 'Program C', duration: '2 years', fee: '8000' }],
  }

  const rows = tableData[category] || []

  return (
    <div className="mb-20">
      <PageHero compact title={t('paymentsPage.title', 'Стоимость обучения')} />

      <div
        role="tablist"
        aria-label={t('paymentsPage.title', 'Стоимость обучения')}
        className="mt-10 flex flex-wrap gap-2"
      >
        {categories.map((item) => {
          const active = category === item.value
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(item.value)}
              className={`h-11 whitespace-nowrap rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${
                active
                  ? 'bg-primary text-white'
                  : 'border border-line bg-white text-ink hover:border-primary/40'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            { key: 'code', label: t('paymentsPage.code') },
            { key: 'program', label: t('paymentsPage.direction') },
            { key: 'duration', label: t('paymentsPage.studyDuration') },
            { key: 'fee', label: t('paymentsPage.studyCost'), align: 'right' },
          ]}
          rows={rows}
        />
      </div>
    </div>
  )
}
