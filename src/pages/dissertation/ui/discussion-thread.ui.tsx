import { FormEvent, useState } from 'react'
import { Alert, Button, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { dissertationLib, dissertationQueries, dissertationTypes } from '~entities/dissertation'

const MAX_LENGTH = 3000

function getApiError(error: unknown) {
  const response = (error as AxiosError<Record<string, unknown>>)?.response
  if (response?.status === 429) return 'Слишком много сообщений подряд. Попробуйте через минуту.'
  const data = response?.data
  if (!data) return 'Не удалось отправить сообщение. Попробуйте позже.'
  const messages = Object.values(data).flat().filter((item) => typeof item === 'string')
  return (messages as string[]).join(' ') || 'Не удалось отправить сообщение.'
}

type MessageFormProps = {
  dissertationId: number
  parent?: number
  placeholder: string
  submitLabel: string
  onDone?: () => void
}

export const MessageForm = ({
  dissertationId,
  parent,
  placeholder,
  submitLabel,
  onDone,
}: MessageFormProps) => {
  const [text, setText] = useState('')
  const mutation = dissertationQueries.useCreateMessage(dissertationId)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    mutation.mutate(
      { text: text.trim(), parent },
      {
        onSuccess: () => {
          setText('')
          onDone?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextField
        multiline
        minRows={parent ? 2 : 3}
        maxRows={12}
        fullWidth
        placeholder={placeholder}
        value={text}
        onChange={(event) => setText(event.target.value)}
        inputProps={{ maxLength: MAX_LENGTH }}
        helperText={`${text.length}/${MAX_LENGTH}`}
        sx={{ backgroundColor: '#FFFFFF' }}
      />
      {mutation.isError && <Alert severity="error">{getApiError(mutation.error)}</Alert>}
      <div className="flex justify-end gap-2">
        {onDone && (
          <Button onClick={onDone} className="text-primary/70">
            Отмена
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending || text.trim().length < 3}
          className="bg-primary shadow-none hover:bg-green disabled:bg-primary/40 disabled:text-white"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

const MessageBubble = ({ message }: { message: dissertationTypes.DiscussionMessage }) => (
  <div
    id={`message-${message.id}`}
    className={`rounded-lg p-4 scroll-mt-28 ${
      message.isDoctoralStudent
        ? 'border border-green/30 bg-green/5'
        : 'border border-primary/10 bg-white'
    }`}
  >
    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
      <span className="font-semibold text-primary">{message.author.fullName}</span>
      {message.isDoctoralStudent && (
        <span className="rounded-md bg-green px-2 py-0.5 text-xs font-semibold text-white">
          Докторант
        </span>
      )}
      {message.isMine && (
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          Вы
        </span>
      )}
      <span className="text-xs text-black/40">
        {dissertationLib.formatDateTime(message.createdAt)}
      </span>
    </div>
    {/* Текст выводится как обычный текст — React экранирует HTML */}
    <p className="whitespace-pre-line break-words text-[15px] leading-relaxed text-black/80">
      {message.text}
    </p>
  </div>
)

type DiscussionThreadProps = {
  thread: dissertationLib.DiscussionThread
  dissertationId: number
  canReply: boolean
}

export const DiscussionThread = ({ thread, dissertationId, canReply }: DiscussionThreadProps) => {
  const [isReplying, setReplying] = useState(false)
  const hasStudentAnswer = thread.replies.some((reply) => reply.isDoctoralStudent)

  return (
    <article className="rounded-lg border border-primary/10 bg-gray-light p-4 sm:p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
        <span className="text-primary/60">Вопрос</span>
        {!hasStudentAnswer && <span className="text-black/40">· ожидает ответа докторанта</span>}
      </div>
      <MessageBubble message={thread.question} />

      {thread.replies.length > 0 && (
        <div className="mt-3 flex flex-col gap-3 border-l-2 border-green/30 pl-4 sm:pl-2">
          {thread.replies.map((reply) => (
            <MessageBubble key={reply.id} message={reply} />
          ))}
        </div>
      )}

      {canReply && (
        <div className="mt-3 pl-4 sm:pl-2">
          {isReplying ? (
            <MessageForm
              dissertationId={dissertationId}
              parent={thread.question.id}
              placeholder="Ваш ответ"
              submitLabel="Ответить"
              onDone={() => setReplying(false)}
            />
          ) : (
            <Button size="small" onClick={() => setReplying(true)} className="text-green">
              Ответить
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
