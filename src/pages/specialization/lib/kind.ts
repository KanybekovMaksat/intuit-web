/** Education level names arrive as strings in the detail response and as objects in the list. */
export const levelTitles = (levels?: unknown): string[] =>
  (Array.isArray(levels) ? levels : [])
    .map((level) =>
      typeof level === 'string' ? level : (level as { title?: string } | null)?.title || ''
    )
    .map((title) => title.trim())
    .filter(Boolean)

export const getProgramKind = (levels?: unknown) => {
  const text = levelTitles(levels).join(' ').toLowerCase()
  return {
    isCourse: text.includes('курс'),
    isPostgraduate: /аспирант|докторант|phd/.test(text),
  }
}

/** Which study forms a program really offers, based on the free-text "trainingForm". */
export const getStudyForms = (trainingForm?: string): ('full' | 'part')[] => {
  const text = (trainingForm || '').toLowerCase()
  const forms: ('full' | 'part')[] = []
  if (/(^|[^а-я])оч/.test(text)) forms.push('full')
  if (text.includes('заоч')) forms.push('part')
  return forms
}
