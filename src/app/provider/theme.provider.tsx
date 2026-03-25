import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import '../theme/index.css'
import 'react-toastify/dist/ReactToastify.css'

type CustomThemeProviderProps = {
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: 'Jost',
  },
})

export function CustomThemeProvider(props: CustomThemeProviderProps) {
  const { children } = props
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <ToastContainer />
    </StyledEngineProvider>
  )
}
