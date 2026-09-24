import { useState } from 'react'
import { Badge, Button } from '@mui/material'
import { Bell, FilePlus2, LogIn, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dissertationLib, dissertationQueries, dissertationTypes } from '~entities/dissertation'
import { sessionQueries } from '~entities/session'
import { AuthDialog } from '~features/auth'
import { pathKeys } from '~shared/lib/react-router'

function publicationBadge(item: dissertationTypes.MyDissertation) {
  if (item.status === 'pending') return { text: 'На проверке', className: 'bg-primary/10 text-primary' }
  if (item.status === 'draft') return { text: 'На доработке', className: 'bg-[#fff4e5] text-[#8a4b00]' }
  if (item.unansweredCount) {
    return { text: `Без ответа: ${item.unansweredCount}`, className: 'bg-primary text-white' }
  }
  return { text: 'Опубликована', className: 'bg-green/10 text-green' }
}

/** Панель участника обсуждения: вход, уведомления, «мои диссертации» для докторанта. */
export const DiscussionUserPanel = () => {
  const { user } = sessionQueries.useCurrentUser()
  const logout = sessionQueries.useLogout()
  const [isAuthOpen, setAuthOpen] = useState(false)
  const [isNotificationsOpen, setNotificationsOpen] = useState(false)
  const { data: notifications = [] } = dissertationQueries.useNotifications(Boolean(user))
  const { data: myDissertations = [] } = dissertationQueries.useMyDissertations(Boolean(user))
  const readNotification = dissertationQueries.useReadNotification()
  const unread = notifications.filter((item) => !item.isRead).length

  const submitButton = (
    <Button
      component={Link}
      to={pathKeys.phd.submit()}
      variant="outlined"
      startIcon={<FilePlus2 size={18} />}
      className="shrink-0 border-primary/15 text-primary"
    >
      Разместить диссертацию
    </Button>
  )

  if (!user) {
    return (
      <div className="mb-8 flex items-center justify-between gap-4 rounded-lg border border-primary/10 bg-white p-4 shadow-sm md:flex-col md:items-start">
        <p className="text-sm text-black/70">
          Читать диссертации может любой посетитель. Чтобы задать вопрос докторанту или
          разместить свою диссертацию, войдите или зарегистрируйтесь на сайте.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          {submitButton}
          <Button
            variant="contained"
            startIcon={<LogIn size={18} />}
            onClick={() => setAuthOpen(true)}
            className="shrink-0 bg-primary shadow-none hover:bg-green"
          >
            Войти
          </Button>
        </div>
        <AuthDialog open={isAuthOpen} onClose={() => setAuthOpen(false)} />
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg border border-primary/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-start">
        <div className="text-sm text-black/70">
          Вы вошли как <span className="font-semibold text-primary">{user.fullName}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {submitButton}
          <Button
            variant="outlined"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="border-primary/15 text-primary"
            startIcon={
              <Badge badgeContent={unread} color="error">
                <Bell size={18} />
              </Badge>
            }
          >
            Уведомления
          </Button>
          <Button
            variant="text"
            onClick={() => logout.mutate()}
            className="text-primary/70"
            startIcon={<LogOut size={18} />}
          >
            Выйти
          </Button>
        </div>
      </div>

      {myDissertations.length > 0 && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <div className="mb-2 text-sm font-semibold text-primary">Мои диссертации</div>
          <ul className="flex flex-col gap-2">
            {myDissertations.map((item) => {
              const badge = publicationBadge(item)
              const isEditable = item.status === 'draft' || item.status === 'pending'
              return (
                <li key={item.id} className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      to={pathKeys.phd.dissertation(item.id)}
                      className="text-sm text-primary underline-offset-2 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2">
                      {isEditable && (
                        <Link
                          to={pathKeys.phd.submit(item.id)}
                          className="text-xs font-semibold text-green hover:underline"
                        >
                          Исправить
                        </Link>
                      )}
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>
                  {item.status === 'draft' && item.moderatorComment && (
                    <p className="whitespace-pre-line rounded-lg bg-[#fff4e5] p-2 text-xs text-[#8a4b00]">
                      Комментарий модератора: {item.moderatorComment}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {isNotificationsOpen && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Уведомления</span>
            {unread > 0 && (
              <Button size="small" onClick={() => readNotification.mutate(undefined)}>
                Прочитать все
              </Button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-black/50">Уведомлений пока нет.</p>
          ) : (
            <ul className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
              {notifications.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`${pathKeys.phd.dissertation(item.dissertationId)}#message-${item.messageId}`}
                    onClick={() => !item.isRead && readNotification.mutate(item.id)}
                    className={`block rounded-lg p-3 text-sm transition-colors hover:bg-green/5 ${
                      item.isRead ? 'bg-gray-light text-black/60' : 'bg-green/10 text-black'
                    }`}
                  >
                    <div className="font-semibold text-primary">{item.kindDisplay}</div>
                    <div className="text-xs text-black/50">
                      {item.dissertationTitle} · {dissertationLib.formatDateTime(item.createdAt)}
                    </div>
                    {item.messageText && (
                      <div className="mt-1 line-clamp-2 whitespace-pre-line">{item.messageText}</div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
