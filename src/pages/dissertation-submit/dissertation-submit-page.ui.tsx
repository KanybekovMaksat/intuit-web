import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import { Alert, Breadcrumbs, Button, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { CheckCircle2, FileUp, LogIn } from 'lucide-react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { dissertationLib, dissertationQueries } from '~entities/dissertation'
import { sessionQueries } from '~entities/session'
import { AuthDialog } from '~features/auth'
import { pathKeys } from '~shared/lib/react-router'
import { Loader } from '~shared/ui/loader'

const MAX_FILE_MB = 50

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} КБ`
    : `${(bytes / 1024 / 1024).toFixed(1)} МБ`

type FormState = {
  title: string
  abstract: string
  specialty: string
  supervisor: string
  discussionStart: string
  discussionEnd: string
  document: File | null
  abstractDocument: File | null
}

type FieldErrors = Partial<Record<keyof FormState | 'common', string>>

const emptyForm: FormState = {
  title: '',
  abstract: '',
  specialty: '',
  supervisor: '',
  discussionStart: '',
  discussionEnd: '',
  document: null,
  abstractDocument: null,
}

// Поля API (camelCase) → поля формы
const apiFieldMap: Record<string, keyof FormState> = {
  title: 'title',
  abstract: 'abstract',
  specialty: 'specialty',
  supervisor: 'supervisor',
  discussionStartAt: 'discussionStart',
  discussionEndAt: 'discussionEnd',
  document: 'document',
  abstractDocument: 'abstractDocument',
}

function parseErrors(error: unknown): FieldErrors {
  const response = (error as AxiosError<Record<string, unknown>>)?.response
  if (response?.status === 429) return { common: 'Слишком много попыток. Попробуйте позже.' }
  if (!response?.data || typeof response.data !== 'object') {
    return { common: 'Не удалось отправить работу. Попробуйте позже.' }
  }
  const result: FieldErrors = {}
  Object.entries(response.data).forEach(([key, value]) => {
    const text = ([] as unknown[]).concat(value).filter((v) => typeof v === 'string').join(' ')
    const field = apiFieldMap[key]
    if (field) result[field] = text
    else result.common = [result.common, text].filter(Boolean).join(' ')
  })
  return result
}

const statusNotice: Record<string, { text: string; className: string }> = {
  pending: { text: 'Работа на проверке у модератора.', className: 'bg-primary/5 text-primary' },
  draft: { text: 'Работа возвращена на доработку.', className: 'bg-[#fff4e5] text-[#8a4b00]' },
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm sm:p-4">
    <h2 className="mb-4 text-lg font-semibold text-primary">{title}</h2>
    <div className="flex flex-col gap-4">{children}</div>
  </section>
)

type FileFieldProps = {
  label: string
  file: File | null
  current?: string
  error?: string
  required?: boolean
  onChange: (file: File | null, error?: string) => void
}

const FileField = ({ label, file, current, error, required, onChange }: FileFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null
    event.target.value = ''
    if (!selected) return
    if (!selected.name.toLowerCase().endsWith('.pdf')) {
      onChange(null, 'Загрузите файл в формате PDF.')
    } else if (selected.size > MAX_FILE_MB * 1024 * 1024) {
      onChange(null, `Максимальный размер файла — ${MAX_FILE_MB} МБ.`)
    } else {
      onChange(selected)
    }
  }

  return (
    <div>
      <div className="mb-1 text-sm font-semibold text-black/70">
        {label} {required && <span className="text-[#d32f2f]">*</span>}
      </div>
      <label
        className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed p-4 transition-colors hover:border-green hover:bg-green/5 ${
          error ? 'border-[#d32f2f]' : 'border-primary/25'
        }`}
      >
        <FileUp size={22} className="shrink-0 text-green" />
        <span className="min-w-0 flex-1 truncate text-sm text-black/70">
          {file
            ? `${file.name} (${formatSize(file.size)})`
            : current
              ? `Загружен: ${current}. Выберите файл, чтобы заменить`
              : `Выберите PDF до ${MAX_FILE_MB} МБ`}
        </span>
        <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleChange} />
      </label>
      {error && <div className="mt-1 text-xs text-[#d32f2f]">{error}</div>}
    </div>
  )
}

export const DissertationSubmitPage = () => {
  const params = useParams()
  const editId = params.id ? Number(params.id) : undefined
  const { user, isLoading: isUserLoading } = sessionQueries.useCurrentUser()
  const [isAuthOpen, setAuthOpen] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [savedId, setSavedId] = useState<number | null>(null)

  const { data: submission, isLoading: isSubmissionLoading, isError: isSubmissionError } =
    dissertationQueries.useSubmission(user ? editId : undefined)
  const save = dissertationQueries.useSaveSubmission(editId)

  // Редактирование: заполняем форму сохранёнными данными
  useEffect(() => {
    if (!submission) return
    setForm({
      title: submission.title,
      abstract: submission.abstract,
      specialty: submission.specialty,
      supervisor: submission.supervisor,
      discussionStart: submission.discussionStartAt.slice(0, 10),
      discussionEnd: submission.discussionEndAt.slice(0, 10),
      document: null,
      abstractDocument: null,
    })
  }, [submission])

  const set = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const currentDocument = (kind: string) =>
    submission?.documents.find((doc) => doc.kind === kind)?.title

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const localErrors: FieldErrors = {}
    if (!form.specialty.trim()) localErrors.specialty = 'Укажите специальность.'
    if (!form.supervisor.trim()) localErrors.supervisor = 'Укажите научного руководителя.'
    if (!editId && !form.document) localErrors.document = 'Прикрепите текст диссертации в PDF.'
    if (form.discussionStart && form.discussionEnd && form.discussionEnd <= form.discussionStart) {
      localErrors.discussionEnd = 'Дата окончания должна быть позже даты начала.'
    }
    if (Object.keys(localErrors).length) {
      setErrors(localErrors)
      return
    }

    const data = new FormData()
    data.append('title', form.title.trim())
    data.append('abstract', form.abstract.trim())
    data.append('specialty', form.specialty.trim())
    data.append('supervisor', form.supervisor.trim())
    // Время — по часовому поясу сервера (Бишкек): обсуждение идёт целыми днями
    data.append('discussionStartAt', `${form.discussionStart}T00:00:00`)
    data.append('discussionEndAt', `${form.discussionEnd}T23:59:59`)
    if (form.document) data.append('document', form.document)
    if (form.abstractDocument) data.append('abstractDocument', form.abstractDocument)

    save.mutate(data, {
      onSuccess: ({ data: saved }) => {
        setSavedId(saved.id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      onError: (error) => setErrors(parseErrors(error)),
    })
  }

  const phdUrl = pathKeys.degree.bySlug({ slug: dissertationLib.PHD_DEGREE_SLUG })
  const pageTitle = editId ? 'Исправление диссертации' : 'Размещение диссертации'

  const header = (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: 'linear-gradient(200deg, rgba(42,33,115,1) 0%, rgba(0,149,111,1) 100%)',
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" className="text-[white]">
        <RouterLink to="/" className="text-white hover:underline">
          Главная
        </RouterLink>
        <RouterLink to={`${phdUrl}#dissertations`} className="text-white hover:underline">
          Общественное обсуждение
        </RouterLink>
      </Breadcrumbs>
      <Typography variant="h1" className="text-[white] font-semibold text-[36px] md:text-[26px]">
        {pageTitle}
      </Typography>
      <p className="max-w-[720px] text-white/80">
        После отправки работу проверит модератор Высшей школы докторантуры. Опубликованная
        диссертация появится в разделе общественного обсуждения. Документы на сайте доступны
        только для просмотра.
      </p>
    </div>
  )

  if (isUserLoading) return <Loader />

  if (!user) {
    return (
      <div className="my-10">
        {header}
        <div className="mt-8 flex items-center justify-between gap-4 rounded-lg border border-primary/10 bg-white p-6 shadow-sm md:flex-col md:items-start">
          <p className="text-black/70">
            Чтобы разместить диссертацию, войдите или зарегистрируйтесь на сайте. ФИО докторанта
            будет взято из вашего профиля.
          </p>
          <Button
            variant="contained"
            startIcon={<LogIn size={18} />}
            onClick={() => setAuthOpen(true)}
            className="shrink-0 bg-primary shadow-none hover:bg-green"
          >
            Войти или зарегистрироваться
          </Button>
        </div>
        <AuthDialog open={isAuthOpen} onClose={() => setAuthOpen(false)} />
      </div>
    )
  }

  if (savedId) {
    return (
      <div className="my-10">
        {header}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-green/30 bg-white p-6 shadow-sm">
          <CheckCircle2 size={40} className="text-green" />
          <h2 className="text-2xl font-semibold text-primary">Работа отправлена на проверку</h2>
          <p className="text-black/70">
            Статус и комментарии модератора видны в блоке «Мои диссертации» на странице
            докторантуры. После публикации начнётся общественное обсуждение.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              component={RouterLink}
              to={`${phdUrl}#dissertations`}
              variant="contained"
              className="bg-primary shadow-none hover:bg-green"
            >
              К разделу докторантуры
            </Button>
            <Button component={RouterLink} to={pathKeys.phd.dissertation(savedId)} variant="outlined">
              Предпросмотр страницы
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (editId && isSubmissionLoading) return <Loader />
  if (editId && isSubmissionError) {
    return <div className="my-20 text-center text-primary/70">Работа не найдена.</div>
  }
  const isLocked = submission && !['draft', 'pending'].includes(submission.status)

  return (
    <div className="my-10">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {header}

      {submission && statusNotice[submission.status] && (
        <div className={`mt-6 rounded-lg p-4 ${statusNotice[submission.status].className}`}>
          <div className="font-semibold">{statusNotice[submission.status].text}</div>
          {submission.moderatorComment && (
            <p className="mt-1 whitespace-pre-line text-sm">
              Комментарий модератора: {submission.moderatorComment}
            </p>
          )}
        </div>
      )}

      {isLocked ? (
        <div className="mt-8 rounded-lg bg-black/5 p-6 text-black/70">
          Работа уже опубликована. Изменения вносит администратор.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>
          <Section title="Сведения о диссертации">
            <div className="text-sm text-black/60">
              Докторант: <b className="text-primary">{user.fullName}</b> (из профиля)
            </div>
            <TextField
              label="Тема диссертации"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              inputProps={{ maxLength: 500 }}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              label="Аннотация"
              value={form.abstract}
              onChange={(e) => set('abstract', e.target.value)}
              required
              multiline
              minRows={5}
              error={Boolean(errors.abstract)}
              helperText={errors.abstract}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <TextField
                label="Специальность"
                value={form.specialty}
                onChange={(e) => set('specialty', e.target.value)}
                required
                inputProps={{ maxLength: 255 }}
                error={Boolean(errors.specialty)}
                helperText={errors.specialty || 'Шифр и название, например: 05.13.01 «Системный анализ»'}
              />
              <TextField
                label="Научный руководитель"
                value={form.supervisor}
                onChange={(e) => set('supervisor', e.target.value)}
                required
                inputProps={{ maxLength: 255 }}
                error={Boolean(errors.supervisor)}
                helperText={errors.supervisor || 'ФИО, учёная степень и звание'}
              />
            </div>
          </Section>

          <Section title="Период общественного обсуждения">
            <p className="-mt-2 text-sm text-black/60">
              Предлагаемые даты. Модератор может скорректировать их при публикации.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <TextField
                label="Начало обсуждения"
                type="date"
                value={form.discussionStart}
                onChange={(e) => set('discussionStart', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.discussionStart)}
                helperText={errors.discussionStart}
              />
              <TextField
                label="Окончание обсуждения"
                type="date"
                value={form.discussionEnd}
                onChange={(e) => set('discussionEnd', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: form.discussionStart || undefined }}
                error={Boolean(errors.discussionEnd)}
                helperText={errors.discussionEnd}
              />
            </div>
          </Section>

          <Section title="Документы (PDF)">
            <FileField
              label="Текст диссертации"
              required={!editId}
              file={form.document}
              current={currentDocument('dissertation')}
              error={errors.document}
              onChange={(file, error) => {
                set('document', file)
                if (error) setErrors((prev) => ({ ...prev, document: error }))
              }}
            />
            <FileField
              label="Автореферат (необязательно)"
              file={form.abstractDocument}
              current={currentDocument('abstract')}
              error={errors.abstractDocument}
              onChange={(file, error) => {
                set('abstractDocument', file)
                if (error) setErrors((prev) => ({ ...prev, abstractDocument: error }))
              }}
            />
          </Section>

          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={save.isPending}
              className="bg-primary shadow-none hover:bg-green disabled:bg-primary/40 disabled:text-white"
            >
              {save.isPending
                ? 'Отправка…'
                : editId
                  ? 'Сохранить и отправить на проверку'
                  : 'Отправить на проверку'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
