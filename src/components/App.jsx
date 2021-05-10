import React, { useRef, useEffect, useState } from 'react'
import { makeStyles, useMediaQuery } from '@material-ui/core'
import { Container, Grid, Paper } from '@material-ui/core'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import NavDrawer from './NavDrawer'
import Map from './map/Map'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    height: '94vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.deault,
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  content: {
    position: 'relative',
    left: 240,
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
  },
  media: {
    height: '100%',
  },
}))

const containerStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const App = () => {
  const classes = useStyles()
  const containerClasses = containerStyles()
  const mapDivRef = useRef(null)
  const [mapDivHeight, setMapDivHeight] = useState(null)
  const [lightOrDark, setLightOrDark] = useState('user')

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

  const toggleLightOrDark = (event) => {
    const mode = event.currentTarget.value
    setLightOrDark(mode)
  }

  useEffect(() => {
    mapDivRef.current = document.getElementById('mapDiv')
    var h = mapDivRef.current.clientHeight
    setMapDivHeight(h)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <main className={classes.content}>
          <Container className={containerClasses.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper} id='mapDiv'>
                  <Map
                    height={mapDivHeight}
                    lightOrDark={lightOrDark}
                    prefersDarkMode={prefersDarkMode}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
        <NavDrawer
          lightOrDark={lightOrDark}
          toggleLightOrDark={toggleLightOrDark}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
