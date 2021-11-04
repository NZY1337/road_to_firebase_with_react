import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import SignOutBtn from '../../components/SignOut/index'
import MenuItem from '@material-ui/core/MenuItem'
import instagram from '../../assets/images/insta.png'
import facebook from '../../assets/images/facebook.png'
import { Link } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(0,0,0,.87)',
    },
  },
  logout: {
    color: 'white',
    background: 'linear-gradient(#eee, gray)',
    backgroundClip: 'border-box',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: 'italic',
  },
  list: {
    width: 250,
    marginTop: '1rem',
    '& .MuiButtonBase-root ': {
      color: '#fff!important',
      minHeight: 'auto',
    },

    '& .MuiButton-text': {
      paddingLeft: '16px',
      paddingTop: 0,
      paddingBottom: 0,
    },

    '& a': {
      color: '#fff!important',
      paddingBottom: '10px',
      textDecoration: 'none',
    },

    '& .active': {
      textDecoration: 'none!important',
      outline: 'none!important',

      '& .MuiButtonBase-root': {
        '& .MuiButton-label': {
          fontFmily: 'Lato, sans-serif !important',
        },
        color: 'aqua!important',
      },
    },
  },
  fullList: {
    width: 'auto',
  },
})

export default function TemporaryDrawer({ authMenu, nonAuthMenu, authUser }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.items}>
        {authUser && authMenu()}
        {nonAuthMenu()}
      </List>

      {authUser && (
        <MenuItem>
          <SignOutBtn />
          <Typography
            color="primary"
            variant="p"
            component="p"
            className={classes.logout}
          >
            Logout
          </Typography>
        </MenuItem>
      )}

      <hr style={{ margin: '16px' }} />

      <div style={{ marginLeft: '16px', marginTop: '16px' }}>
        <Link href="https://instagram.com/nzy1337">
          <img
            style={{ width: '20px', marginRight: '.5rem' }}
            src={instagram}
            alt={'my description menu drawer'}
          />
        </Link>

        <Link href="https://facebook.com/nzy1337">
          <img
            style={{ width: '20px' }}
            src={facebook}
            alt={'facebook share'}
          />
        </Link>
      </div>
    </div>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            className={classes.root}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}

            <div
              className="over"
              style={{
                width: '30%',
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '20%',
                position: 'absolute',
                backgroundColor: 'rgba(255, 0, 0, .2)',
                margin: '0 auto!important',
                zIndex: '-1',
                clipPath:
                  'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',

                // borderRadius: " 0% 100% 100% 0% / 100% 100% 100% 0%",
                // marginLeft: "2rem",
              }}
            ></div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
