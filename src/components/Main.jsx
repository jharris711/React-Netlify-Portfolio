import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Container, Grid, Paper } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import NavDrawer from './drawer/NavDrawer'
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

const Main = ({
  prefersDarkMode,
  mapDivHeight,
  setMapDivHeight,
  lightOrDark,
  setLightOrDark,
}) => {
  const { enqueueSnackbar /* closeSnackbar */ } = useSnackbar()
  const classes = useStyles()
  const containerClasses = containerStyles()

  const mapDivRef = useRef(null)

  const toggleLightOrDark = (event) => {
    const mode = event.currentTarget.value
    localStorage.setItem('mode', mode)
    setLightOrDark(mode)
  }

  useEffect(() => {
    const mode = localStorage.getItem('mode')
    if (mode) {
      setLightOrDark(mode)
    } else {
      setLightOrDark('user')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    mapDivRef.current = document.getElementById('mapDiv')
    var h = mapDivRef.current.clientHeight
    setMapDivHeight(h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const lightOrDarkSnackBar = (mode) => {
      switch (mode) {
        case 'light':
          enqueueSnackbar('Light Mode Activated')
          break
        case 'dark':
          enqueueSnackbar('Dark Mode Activated')
          break
        case 'user':
          enqueueSnackbar('Display Mode Decided By OS Preferences')
          break
        default:
          return
      }
    }
    lightOrDarkSnackBar(lightOrDark)
  }, [lightOrDark, enqueueSnackbar])

  return (
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
  )
}

export default Main
