import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  Link,
  Tooltip,
  IconButton,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import {
  GitHub,
  BrightnessHigh,
  Brightness3,
  AccountCircle,
} from '@material-ui/icons'
import { SiNetlify } from 'react-icons/si'
import pupsImage from '../../assets/images/pups.jpeg'

const drawerWidth = 240

const avatarStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.text.secondary,
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerSmallScreen: {
    width: `100%`,
    flexShrink: 0,
  },
  drawerPaperSmallScreen: {
    width: `100%`,
  },
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}))

const NavDrawer = ({ matches, lightOrDark, toggleLightOrDark }) => {
  const classes = useStyles()
  const avatarClasses = avatarStyles()

  return (
    <Drawer
      className={matches ? classes.drawer : classes.drawerSmallScreen}
      variant='permanent'
      classes={{
        paper: matches ? classes.drawerPaper : classes.drawerPaperSmallScreen,
      }}
      anchor='left'
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
        <Avatar alt='J. Harris' src={pupsImage} className={classes.image} />
      </div>
      <div
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h5' align='center' color='textPrimary'>
          J. Harris Web Dev
        </Typography>
      </div>
      <br />
      <div
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ButtonGroup
          color='textPrimary'
          aria-label='outlined textPrimary button group'
          variant='contained'
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Tooltip title='Toggle Light Mode'>
            <Button
              aria-label='toggle light mode'
              value='light'
              onClick={(event) => toggleLightOrDark(event)}
            >
              <BrightnessHigh />
            </Button>
          </Tooltip>
          <Tooltip title='Toggle Dark Mode'>
            <Button
              aria-label='toggle dark mode'
              value='dark'
              onClick={(event) => toggleLightOrDark(event)}
            >
              <Brightness3 />
            </Button>
          </Tooltip>
          <Tooltip title='User System Preference'>
            <Button
              aria-label='delete'
              value='user'
              onClick={(event) => toggleLightOrDark(event)}
            >
              <AccountCircle />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <br />
      <Divider />
      <List>
        <Link
          href='https://www.linkedin.com/in/joshsharris/'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'LinkedIn'} dense>
            <ListItemText primary={'LinkedIn'} secondary={'Work History'} />
          </ListItem>
        </Link>
        <Link
          href='https://jharriswebdev.medium.com/'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'Medium'} dense>
            <ListItemText primary={'Medium'} secondary={`Blogs I've Written`} />
          </ListItem>
        </Link>
        <Link
          href='https://stackoverflow.com/users/15165070/jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'StackOverflow'} dense>
            <ListItemText
              primary={'Stack Overflow'}
              secondary={'Questions & Answers'}
            />
          </ListItem>
        </Link>
        <Link
          href='https://stackblitz.com/@jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'Demos'} dense>
            <ListItemText
              primary={'Stack Blitz'}
              secondary={'Demos & Projects'}
            />
          </ListItem>
        </Link>
        <Link
          href='https://github.com/jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'GitHub'} dense>
            <ListItemText primary={'GitHub'} secondary={`My Repos`} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <div className={avatarClasses.root}>
        <Tooltip title='See the code for this site'>
          <Link
            href='https://github.com/jharris711/React-Netlify-Portfolio'
            target='_blank'
            color='inherit'
            onClick={(event) => event.preventDefault}
            style={{ textDecoration: 'none' }}
          >
            <IconButton aria-label='delete'>
              <Avatar
                className={avatarClasses.avatar}
                alt='Github icon link to site repo'
              >
                <GitHub />
              </Avatar>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title='Hosted via Netlify'>
          <Link
            href='https://www.netlify.com/'
            target='_blank'
            color='inherit'
            onClick={(event) => event.preventDefault}
            style={{ textDecoration: 'none' }}
          >
            <IconButton aria-label='delete'>
              <Avatar
                className={avatarClasses.avatar}
                alt='Netlify icon link to netlify home page'
              >
                <SiNetlify />
              </Avatar>
            </IconButton>
          </Link>
        </Tooltip>
      </div>
    </Drawer>
  )
}

export default NavDrawer
