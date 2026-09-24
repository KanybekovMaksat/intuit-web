import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Breadcrumbs, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import { Eye, FileText, LogIn } from 'lucide-react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { dissertationLib, dissertationQueries, dissertationTypes } from '~entities/dissertation'
import { sessionQueries } from '~entities/session'
import { AuthDialog } from '~features/auth'
import { pathKeys } from '~shared/lib/react-router'
import { Loader } from '~shared/ui/loader'
import { DiscussionThread, MessageForm } from './ui/discussion-thread.ui'
import { DocumentDialog } from './ui/document-dialog.ui'

const { formatDate, discussionStatusLabel, questionsLabel } = dissertationLib

const InfoRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-b border-primary/10 py-3 last:border-b-0">
    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/50">{label}</div>
    <div className="mt-1 text-[15px] text-black/80">{children}</div>
  </div>
)

export const DissertationPage = () => {
  const id = Number(useParams().id)
  const { hash } = useLocation()
  const { user } = sessionQueries.useCurrentUser()
  const [isAuthOpen, setAuthOpen] = useState(false)
  const [onlyMine, setOnlyMine] = useState(false)
  const [openedDocument, setOpenedDocument] =
    useState<dissertationTypes.DissertationDocument | null>(null)
  const { data: dissertation, isLoading, isError } = dissertationQueries.useDissertation(id)
  const { data: messages = [] } = dissertationQueries.useMessages(id)

  const threads = useMemo(() => {
    const all = dissertationLib.buildThreads(messages)
    return onlyMine
      ? all.filter((thread) => thread.question.isMine || thread.replies.some((r) => r.isMine))
      : all
  }, [messages, onlyMine])

  // Переход из уведомления: прокручиваем к сообщению
  useEffect(() => {
    if (hash && messages.length) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash, messages.length])

  if (isLoading) return <Loader />
  if (isError || !dissertation) {
    return (
      <div className="my-20 text-center text-primary/70">
        Диссертация не найдена или ещё не опубликована.
      </div>
    )
  }

  const isOpen = dissertation.isDiscussionOpen
  const isOwner = dissertation.isOwner
  const phdUrl = pathKeys.degree.bySlug({ slug: dissertationLib.PHD_DEGREE_SLUG })
  const mainDocument = dissertation.documents.find((doc) => doc.kind === 'dissertation')

  return (
    <div className="my-10">
      <Helmet>
        <title>{dissertation.title}</title>
      </Helmet>

      <div
        className="rounded-2xl p-5 flex flex-col gap-6"
        style={{
          background: 'linear-gradient(200deg, rgba(42,33,115,1) 0%, rgba(0,149,111,1) 100%)',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" className="text-[white]">
          <RouterLink to="/" className="text-white hover:underline">
            Главная
          </RouterLink>
          <RouterLink to={phdUrl} className="text-white hover:underline">
            Докторантура PhD
          </RouterLink>
          <RouterLink to={`${phdUrl}#dissertations`} className="text-white hover:underline">
            Общественное обсуждение
          </RouterLink>
        </Breadcrumbs>
        <div>
          <span className="inline-block rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-primary">
            {discussionStatusLabel[dissertation.discussionStatus]}
          </span>
          <Typography
            variant="h1"
            className="mt-4 text-[white] font-semibold text-[36px] leading-tight md:text-[26px]"
          >
            {dissertation.title}
          </Typography>
          <div className="mt-3 text-lg text-white/80">{dissertation.doctoralStudentName}</div>
        </div>
        {mainDocument && (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="contained"
              onClick={() => setOpenedDocument(mainDocument)}
              startIcon={<Eye size={18} />}
              className="bg-white text-primary shadow-none hover:bg-white/90"
            >
              Читать диссертацию
            </Button>
          </div>
        )}
      </div>

      {isOwner && dissertation.status !== 'published' && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-primary/5 p-4 text-primary">
          <span>
            {dissertation.status === 'pending'
              ? 'Предпросмотр: работа на проверке у модератора и пока не видна посетителям.'
              : 'Предпросмотр: работа не опубликована.'}
          </span>
          {(dissertation.status === 'pending' || dissertation.status === 'draft') && (
            <RouterLink
              to={pathKeys.phd.submit(dissertation.id)}
              className="font-semibold text-green hover:underline"
            >
              Исправить
            </RouterLink>
          )}
        </div>
      )}

      <div className="mt-8 grid grid-cols-[1fr_360px] gap-8 lg:grid-cols-1">
        <section className="self-start rounded-lg border border-primary/10 bg-white p-6 shadow-sm sm:p-4">
          <h2 className="mb-3 text-2xl font-semibold text-primary">Аннотация</h2>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-black/80">
            {dissertation.abstract}
          </p>
        </section>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-primary/10 bg-white px-6 py-3 shadow-sm sm:px-4">
            <InfoRow label="Докторант">{dissertation.doctoralStudentName}</InfoRow>
            <InfoRow label="Специальность">{dissertation.specialty}</InfoRow>
            <InfoRow label="Научный руководитель">{dissertation.supervisor}</InfoRow>
            <InfoRow label="Дата публикации">{formatDate(dissertation.publishedAt)}</InfoRow>
            <InfoRow label="Общественное обсуждение">
              {formatDate(dissertation.discussionStartAt)} —{' '}
              {formatDate(dissertation.discussionEndAt)}
            </InfoRow>
          </div>

          <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm sm:p-4">
            <h2 className="text-lg font-semibold text-primary">Документы</h2>
            <p className="mb-3 text-xs text-black/50">Доступны только для просмотра на сайте</p>
            {dissertation.documents.length === 0 ? (
              <p className="text-sm text-black/50">Документы не прикреплены.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {dissertation.documents.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => setOpenedDocument(doc)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-green/10"
                    >
                      <FileText size={22} className="shrink-0 text-green" />
                      <span className="min-w-0 flex-1 text-sm text-black/80">
                        {doc.title || doc.kindDisplay}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                        <Eye size={18} /> Смотреть
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-10 rounded-lg border border-primary/10 bg-white p-6 shadow-sm sm:p-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Общественное обсуждение</h2>
            <div className="mt-1 text-sm text-black/50">
              {questionsLabel(dissertation.questionsCount)}
              {isOwner && dissertation.unansweredCount !== null && (
                <> · без вашего ответа: <b className="text-primary">{dissertation.unansweredCount}</b></>
              )}
            </div>
          </div>
          {user && !isOwner && (
            <FormControlLabel
              control={
                <Switch checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} />
              }
              label="Только мои вопросы"
            />
          )}
        </div>

        {dissertation.discussionStatus === 'finished' && (
          <div className="mb-6 rounded-lg bg-black/5 p-4 text-sm text-black/70">
            Обсуждение завершено {formatDate(dissertation.discussionEndAt)}. Новые вопросы и ответы
            не принимаются, история обсуждения сохранена.
          </div>
        )}
        {dissertation.discussionStatus === 'upcoming' && (
          <div className="mb-6 rounded-lg bg-primary/5 p-4 text-sm text-primary">
            Обсуждение начнётся {formatDate(dissertation.discussionStartAt)}.
          </div>
        )}

        {isOpen && !user && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-lg bg-green/5 p-4 md:flex-col md:items-start">
            <span className="text-sm text-black/70">
              Чтобы задать вопрос докторанту, войдите или зарегистрируйтесь.
            </span>
            <Button
              variant="contained"
              startIcon={<LogIn size={18} />}
              onClick={() => setAuthOpen(true)}
              className="shrink-0 bg-primary shadow-none hover:bg-green"
            >
              Войти и задать вопрос
            </Button>
          </div>
        )}
        {isOpen && user && !isOwner && (
          <div className="mb-8">
            <MessageForm
              dissertationId={dissertation.id}
              placeholder="Ваш вопрос докторанту по теме исследования"
              submitLabel="Задать вопрос"
            />
          </div>
        )}
        {isOpen && isOwner && (
          <div className="mb-6 rounded-lg bg-green/5 p-4 text-sm text-black/70">
            Это ваша диссертация. Отвечайте на вопросы в ветках — ответы публикуются открыто.
          </div>
        )}

        {threads.length === 0 ? (
          <p className="py-6 text-center text-black/50">
            {onlyMine ? 'Вы ещё не задавали вопросов.' : 'Вопросов пока нет.'}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {threads.map((thread) => (
              <DiscussionThread
                key={thread.question.id}
                thread={thread}
                dissertationId={dissertation.id}
                canReply={isOpen && (isOwner || thread.question.isMine)}
              />
            ))}
          </div>
        )}
      </section>

      <DocumentDialog document={openedDocument} onClose={() => setOpenedDocument(null)} />
      <AuthDialog
        open={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        description="Используйте аккаунт сайта МУИТ или создайте новый."
      />
    </div>
  )
}
