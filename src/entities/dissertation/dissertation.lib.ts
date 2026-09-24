import dayjs from 'dayjs'
import { DiscussionMessage, DiscussionStatus } from './dissertation.types'

export const PHD_DEGREE_SLUG = 'doktorantura-phd'

export const formatDate = (value?: string | null) =>
  value ? dayjs(value).format('DD.MM.YYYY') : '—'

export const formatDateTime = (value: string) => dayjs(value).format('DD.MM.YYYY, HH:mm')

export const discussionStatusLabel: Record<DiscussionStatus, string> = {
  upcoming: 'Обсуждение не началось',
  open: 'Обсуждение открыто',
  finished: 'Обсуждение завершено',
}

export const discussionStatusClass: Record<DiscussionStatus, string> = {
  upcoming: 'bg-primary/10 text-primary',
  open: 'bg-green/10 text-green',
  finished: 'bg-black/5 text-black/60',
}

export function questionsLabel(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} вопрос`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} вопроса`
  return `${count} вопросов`
}

export type DiscussionThread = {
  question: DiscussionMessage
  replies: DiscussionMessage[]
}

/** Вопрос → ответы в его ветке, в хронологическом порядке. */
export function buildThreads(messages: DiscussionMessage[]): DiscussionThread[] {
  const threads = new Map<number, DiscussionThread>()
  messages
    .filter((message) => message.parent === null)
    .forEach((question) => threads.set(question.id, { question, replies: [] }))
  messages
    .filter((message) => message.parent !== null)
    .forEach((reply) => threads.get(reply.parent as number)?.replies.push(reply))
  return Array.from(threads.values())
}
