import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Drawer,
  List,
  Divider,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Link,
} from '@material-ui/core'
import { Inbox, Code, GitHub, LinkedIn } from '@material-ui/icons'
import pupsImage from '../assets/images/pups.jpeg'

const drawerWidth = 240

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
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}))

const NavDrawer = () => {
  const classes = useStyles()

  const socialIcons = (type) => {
    switch (type) {
      case 'About':
        return
      case 'LinkedIn':
        return <LinkedIn />
      case 'Blog':
        return <Icon className='fab fa-medium' />
      case 'Demos':
        return <Code />
      case 'StackOverflow':
        return (
          <div
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <Icon className='fab fa-stack-overflow' />
          </div>
        )
      case 'GitHub':
        return <GitHub />
      default:
        return
    }
  }

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='left'
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
        <Avatar alt='J. Harris' src={pupsImage} className={classes.image} />
      </div>
      <Typography variant='h5' align='center' color='textPrimary'>
        J. Harris Web Dev
      </Typography>
      <br />
      <Divider />
      <List>
        <Link
          href='https://stackblitz.com/@jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
        >
          <ListItem button key={'Demos'}>
            <ListItemText primary={'Demos'} />
          </ListItem>
        </Link>
        <Link
          href='https://www.linkedin.com/in/joshsharris/'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
        >
          <ListItem button key={'LinkedIn'}>
            <ListItemText primary={'LinkedIn'} />
          </ListItem>
        </Link>
        <Link
          href='https://jharriswebdev.medium.com/'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
        >
          <ListItem button key={'Medium'}>
            <ListItemText primary={'Medium'} />
          </ListItem>
        </Link>
        <Link
          href='https://stackoverflow.com/users/15165070/jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
        >
          <ListItem button key={'StackOverflow'}>
            <ListItemText primary={'StackOverflow'} />
          </ListItem>
        </Link>
        <Link
          href='https://github.com/jharris711'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
        >
          <ListItem button key={'GitHub'}>
            <ListItemText primary={'GitHub'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  )
}

export default NavDrawer
