import { FormEvent, useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { X } from 'lucide-react'
import { AxiosError } from 'axios'
import { sessionQueries } from '~entities/session'

type AuthDialogProps = {
  open: boolean
  onClose: () => void
  description?: string
}

type Mode = 'login' | 'register'

const emptyForm = { email: '', password: '', firstName: '', lastName: '' }

function getErrorMessage(error: unknown) {
  const data = (error as AxiosError<Record<string, unknown>>)?.response?.data
  if (!data) return 'Не удалось выполнить запрос. Попробуйте позже.'
  const messages = Object.values(data).flat().filter((item) => typeof item === 'string')
  return (messages as string[]).join(' ') || 'Проверьте введённые данные.'
}

/** Вход и регистрация в общей системе пользователей сайта. */
export const AuthDialog = ({ open, onClose, description }: AuthDialogProps) => {
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState(emptyForm)
  const loginMutation = sessionQueries.useLogin()
  const registerMutation = sessionQueries.useRegister()
  const mutation = mode === 'login' ? loginMutation : registerMutation

  const handleChange = (field: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const onSuccess = () => {
      setForm(emptyForm)
      onClose()
    }
    if (mode === 'login') {
      loginMutation.mutate({ email: form.email, password: form.password }, { onSuccess })
    } else {
      registerMutation.mutate(form, { onSuccess })
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    loginMutation.reset()
    registerMutation.reset()
  }

  return (
    // Портал внутри #root: Tailwind в проекте подключён с `important: "#root"`
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      container={() => document.getElementById('root')}
      // Выше фиксированной шапки сайта (z-index 90000)
      sx={{ zIndex: 100000 }}
    >
      <DialogTitle className="flex items-center justify-between pb-0 font-semibold text-primary">
        {mode === 'login' ? 'Вход' : 'Регистрация'}
        <IconButton onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {description && <p className="mb-2 text-sm text-black/60">{description}</p>}
        <Tabs
          value={mode}
          onChange={(_, value: Mode) => switchMode(value)}
          variant="fullWidth"
          className="mb-4"
        >
          <Tab value="login" label="Вход" />
          <Tab value="register" label="Регистрация" />
        </Tabs>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <>
              <TextField
                label="Фамилия"
                value={form.lastName}
                onChange={(event) => handleChange('lastName')(event.target.value)}
                required
                autoComplete="family-name"
              />
              <TextField
                label="Имя"
                value={form.firstName}
                onChange={(event) => handleChange('firstName')(event.target.value)}
                required
                autoComplete="given-name"
              />
            </>
          )}
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange('email')(event.target.value)}
            required
            autoComplete="email"
          />
          <TextField
            label="Пароль"
            type="password"
            value={form.password}
            onChange={(event) => handleChange('password')(event.target.value)}
            required
            inputProps={{ minLength: mode === 'register' ? 8 : undefined }}
            helperText={mode === 'register' ? 'Не менее 8 символов, не только цифры' : undefined}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
          {mutation.isError && <Alert severity="error">{getErrorMessage(mutation.error)}</Alert>}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={mutation.isPending}
            className="bg-primary shadow-none hover:bg-green disabled:bg-primary/40 disabled:text-white"
          >
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
