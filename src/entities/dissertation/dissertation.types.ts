export type DiscussionStatus = 'upcoming' | 'open' | 'finished'

export type DissertationDocument = {
  id: number
  kind: 'dissertation' | 'abstract' | 'other'
  kindDisplay: string
  title: string
  /** Временная ссылка только для встроенного просмотрщика */
  viewUrl: string
}

export type Dissertation = {
  id: number
  title: string
  abstract: string
  doctoralStudentName: string
  specialty: string
  supervisor: string
  publishedAt: string | null
  discussionStartAt: string
  discussionEndAt: string
  discussionStatus: DiscussionStatus
  questionsCount: number
}

export type PublicationStatus = 'draft' | 'pending' | 'published' | 'hidden'

export type DissertationDetail = Dissertation & {
  status: PublicationStatus
  documents: DissertationDocument[]
  isOwner: boolean
  isDiscussionOpen: boolean
  unansweredCount: number | null
}

export type MyDissertation = Dissertation & {
  status: PublicationStatus
  moderatorComment: string
  unansweredCount: number
}

/** Работа в форме подачи: специальность и руководитель — id */
export type Submission = {
  id: number
  title: string
  abstract: string
  specialty: string
  supervisor: string
  discussionStartAt: string
  discussionEndAt: string
  status: PublicationStatus
  moderatorComment: string
  documents: DissertationDocument[]
}


export type DiscussionMessage = {
  id: number
  parent: number | null
  text: string
  author: { id: number; fullName: string }
  isDoctoralStudent: boolean
  isMine: boolean
  createdAt: string
}

export type DiscussionNotification = {
  id: number
  kind: 'new_question' | 'student_answer' | 'new_reply'
  kindDisplay: string
  isRead: boolean
  createdAt: string
  dissertationId: number
  dissertationTitle: string
  messageId: number
  messageText: string | null
}

export type Paginated<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type DissertationFilters = {
  page: number
  search: string
  discussionStatus: DiscussionStatus | ''
  specialty: string
}
