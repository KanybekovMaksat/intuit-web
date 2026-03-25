import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Close } from '@mui/icons-material'
import { Typography } from '@mui/material'
import apiClient from '~shared/lib/api/apiClient'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const questions = [
  {
    question: 'Вы склонны больше к профессиям?',
    options: ['Гуманитарным', 'Техническим'],
  },
  {
    question: 'Какое направление обучения вас интересует?',
    options: [
      'Колледж',
      'Бакалавриат',
      'Магистратура',
      'Аспирантура',
      'Бизнес образование',
      'Курсы',
    ],
  },
  {
    question: 'Какой формат обучения вам подходит?',
    options: ['Очно', 'Заочно'],
  },
  { question: 'Вас интересуют бюджетные места?', options: ['Да', 'Нет'] },
  { question: 'Нужно ли трудоустройство?', options: ['Да', 'Нет'] },
]

export const Quizizz = ({ onClose }) => {
  const [value, setValue] = React.useState(0)
  const [answers, setAnswers] = React.useState(questions.map(() => ''))
  const [contactInfo, setContactInfo] = React.useState({
    phoneNumber: '',
    emailAddress: '',
    userName: '',
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (answers[value] !== '') {
      setValue(newValue)
    }
  }

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = event.target.value
    setAnswers(updatedAnswers)
    if (index < questions.length - 1) {
      setValue(index + 1)
    } else {
      setValue(questions.length)
    }
  }

  const handleContactInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const slug = window.location.href
    try {
      await apiClient.post('/university/user-application/', {
        user: contactInfo.userName,
        phone: contactInfo.phoneNumber,
        email: contactInfo.emailAddress,
        slug,
      })
      alert(`Заявка успешно отправлена! Путь: ${slug}`)
    } catch (error) {
      console.error('Ошибка при отправке:', error)
      alert('Ошибка при отправке заявки')
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Close sx={{ cursor: 'pointer' }} onClick={() => onClose(false)} />
      </div>
      <Tabs value={value} onChange={handleChange} aria-label="quiz tabs">
        {questions.map((_, index) => (
          <Tab key={index} label={index + 1} />
        ))}
        <Tab label="Контактные данные" disabled={answers.includes('')} />
      </Tabs>
      {questions.map((question, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <FormControl>
            <Typography variant="h6">{question.question}</Typography>
            <RadioGroup
              value={answers[index]}
              onChange={(e) => handleOptionChange(e, index)}
            >
              {question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CustomTabPanel>
      ))}
      <CustomTabPanel value={value} index={questions.length}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="phoneNumber"
            label="Телефон"
            value={contactInfo.phoneNumber}
            onChange={handleContactInfoChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="emailAddress"
            label="Email"
            value={contactInfo.emailAddress}
            onChange={handleContactInfoChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="userName"
            label="User"
            value={contactInfo.userName}
            onChange={handleContactInfoChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Отправить
          </Button>
        </form>
      </CustomTabPanel>
    </Box>
  )
}
