import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import '@fontsource-variable/onest'
import '../theme/index.css'
import 'react-toastify/dist/ReactToastify.css'

type CustomThemeProviderProps = {
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: ['"Onest Variable"', 'Onest', 'Inter', 'sans-serif'].join(','),
  },
  shape: { borderRadius: 12 },
  palette: {
    primary: { main: '#2A2172' },
    secondary: { main: '#00956F' },
    text: { primary: '#14123A', secondary: '#4B4D6B' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid #E1E3EE',
        },
      },
    },
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
