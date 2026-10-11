import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Button, FormControlLabel, Switch } from '@mui/material'
import { Eye, FileText, LogIn } from 'lucide-react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { dissertationLib, dissertationQueries, dissertationTypes } from '~entities/dissertation'
import { sessionQueries } from '~entities/session'
import { AuthDialog } from '~features/auth'
import { pathKeys } from '~shared/lib/react-router'
import { Loader } from '~shared/ui/loader'
import { PageHero } from '~shared/ui/page'
import { DiscussionThread, MessageForm } from './ui/discussion-thread.ui'
import { DocumentDialog } from './ui/document-dialog.ui'

const { formatDate, discussionStatusLabel, questionsLabel } = dissertationLib

const InfoRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-b border-line py-3 last:border-b-0">
    <div className="text-xs font-medium text-ink-soft">{label}</div>
    <div className="mt-1 text-[15px] text-ink">{children}</div>
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
      <div className="my-20 text-center text-ink-soft">
        Диссертация не найдена или ещё не опубликована.
      </div>
    )
  }

  const isOpen = dissertation.isDiscussionOpen
  const isOwner = dissertation.isOwner
  const phdUrl = pathKeys.degree.bySlug({ slug: dissertationLib.PHD_DEGREE_SLUG })
  const mainDocument = dissertation.documents.find((doc) => doc.kind === 'dissertation')

  return (
    <div className="mb-20">
      <Helmet>
        <title>{dissertation.title}</title>
      </Helmet>

      <PageHero
        title={dissertation.title}
        subtitle={dissertation.doctoralStudentName}
        crumbs={[
          { label: 'Докторантура PhD', to: phdUrl },
          { label: 'Общественное обсуждение', to: `${phdUrl}#dissertations` },
        ]}
        actions={
          mainDocument ? (
            <button
              type="button"
              onClick={() => setOpenedDocument(mainDocument)}
              className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
            >
              <Eye size={18} aria-hidden />
              Читать диссертацию
            </button>
          ) : undefined
        }
      >
        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
          {discussionStatusLabel[dissertation.discussionStatus]}
        </span>
      </PageHero>

      {isOwner && dissertation.status !== 'published' && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gray-light p-4 text-ink">
          <span>
            {dissertation.status === 'pending'
              ? 'Предпросмотр: работа на проверке у модератора и пока не видна посетителям.'
              : 'Предпросмотр: работа не опубликована.'}
          </span>
          {(dissertation.status === 'pending' || dissertation.status === 'draft') && (
            <RouterLink
              to={pathKeys.phd.submit(dissertation.id)}
              className="font-semibold text-green-dark hover:underline"
            >
              Исправить
            </RouterLink>
          )}
        </div>
      )}

      <div className="mt-8 grid grid-cols-[1fr_360px] gap-8 lg:grid-cols-1">
        <section className="min-w-0 self-start rounded-3xl border border-line bg-white p-7 sm:p-4">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Общественное обсуждение</h2>
              <div className="mt-1 text-sm text-ink-soft">
                {questionsLabel(dissertation.questionsCount)}
                {isOwner && dissertation.unansweredCount !== null && (
                  <> {String.fromCharCode(183)} без вашего ответа: <b className="text-ink">{dissertation.unansweredCount}</b></>
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
            <div className="mb-6 rounded-2xl bg-gray-light p-4 text-sm text-ink-soft">
              Обсуждение завершено. Новые вопросы и ответы не принимаются, история обсуждения
              сохранена.
            </div>
          )}
          {dissertation.discussionStatus === 'upcoming' && (
            <div className="mb-6 rounded-2xl bg-gray-light p-4 text-sm text-ink">
              Общественное обсуждение ещё не началось.
            </div>
          )}

          {isOpen && !user && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-green/10 p-4 md:flex-col md:items-start">
              <span className="text-sm text-ink-soft">
                Чтобы задать вопрос докторанту, войдите или зарегистрируйтесь.
              </span>
              <Button
                variant="contained"
                startIcon={<LogIn size={18} />}
                onClick={() => setAuthOpen(true)}
                className="shrink-0 bg-green-dark shadow-none hover:bg-primary"
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
            <div className="mb-6 rounded-lg bg-green/5 p-4 text-sm text-ink-soft">
              Это ваша диссертация. Отвечайте на вопросы в ветках, ответы публикуются открыто.
            </div>
          )}

          {threads.length === 0 ? (
            <p className="py-6 text-center text-ink-soft">
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

        <aside className="flex flex-col gap-6">
          <div className="rounded-3xl border border-line bg-white px-6 py-3 sm:px-4">
            <InfoRow label="Докторант">{dissertation.doctoralStudentName}</InfoRow>
            <InfoRow label="Специальность">{dissertation.specialty}</InfoRow>
            <InfoRow label="Научный руководитель">{dissertation.supervisor}</InfoRow>
            <InfoRow label="Дата публикации">{formatDate(dissertation.publishedAt)}</InfoRow>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 sm:p-4">
            <h2 className="text-lg font-semibold text-ink">Документы</h2>
            <p className="mb-3 text-xs text-ink-soft">Доступны только для просмотра на сайте</p>
            {dissertation.documents.length === 0 ? (
              <p className="text-sm text-ink-soft">Документы не прикреплены.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {dissertation.documents.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => setOpenedDocument(doc)}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-gray-light"
                    >
                      <FileText size={22} className="shrink-0 text-green-dark" />
                      <span className="min-w-0 flex-1 text-sm text-ink">
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

      <DocumentDialog document={openedDocument} onClose={() => setOpenedDocument(null)} />
      <AuthDialog
        open={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        description="Используйте аккаунт сайта МУИТ или создайте новый."
      />
    </div>
  )
}
