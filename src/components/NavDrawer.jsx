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
} from '@material-ui/core'
// npm install --save-dev @iconify/react @iconify-icons/logos
import { Icon, InlineIcon } from '@iconify/react'
import netlifyIcon from '@iconify-icons/logos/netlify'
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
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'Demos'}>
            <ListItemText
              primary={'Stack Blitz'}
              secondary={'Demos & Projects'}
            />
          </ListItem>
        </Link>
        <Link
          href='https://www.linkedin.com/in/joshsharris/'
          target='_blank'
          color='inherit'
          onClick={(event) => event.preventDefault}
          style={{ textDecoration: 'none' }}
        >
          <ListItem button key={'LinkedIn'}>
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
          <ListItem button key={'Medium'}>
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
          <ListItem button key={'StackOverflow'}>
            <ListItemText
              primary={'Stack Overflow'}
              secondary={'Questions & Answers'}
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
          <ListItem button key={'GitHub'}>
            <ListItemText primary={'GitHub'} secondary={`My Repos`} />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  )
}

export default NavDrawer
