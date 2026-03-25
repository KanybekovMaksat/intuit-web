import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UseTestResetReturn = {
  isMobile: boolean
  handleReset: () => void
}

export const useTestReset = (): UseTestResetReturn => {
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false)

    const handleReset = (): void => {
        localStorage.removeItem('quizResults')
        navigate('/tanda/test')
    }

    const handleResize = (): void => {
        setIsMobile(window.innerWidth <= 516)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return {
        isMobile,
        handleReset
    }
}