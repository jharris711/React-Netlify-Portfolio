import React, { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { Grow } from '@material-ui/core'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

import Main from './Main'

const App = () => {
  const [mapDivHeight, setMapDivHeight] = useState(null)
  const [lightOrDark, setLightOrDark] = useState(null)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = createMuiTheme({
    palette: {
      type:
        lightOrDark === 'user'
          ? prefersDarkMode
            ? 'dark'
            : 'light'
          : lightOrDark === 'dark'
          ? 'dark'
          : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // preventDuplicate
        autoHideDuration={3000}
        TransitionComponent={Grow}
      >
        <Main
          prefersDarkMode={prefersDarkMode}
          mapDivHeight={mapDivHeight}
          setMapDivHeight={setMapDivHeight}
          lightOrDark={lightOrDark}
          setLightOrDark={setLightOrDark}
        />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
