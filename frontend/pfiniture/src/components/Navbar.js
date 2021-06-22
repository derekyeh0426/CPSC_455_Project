import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { withTheme } from '@material-ui/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fresh Furniture
          </Typography>
            <Link
              to={"/home"}
            >
              <Button >Home</Button>
            </Link>
            <Link
              to={"/about"}
            >
              <Button >About</Button>
            </Link>
            <Link
              to={"/dashboard"}
            >
              <Button >My Account</Button>
            </Link>
            <Link
              to={"/login"}
            >
              <Button >Login</Button>
            </Link>
            <Link
              to={"/register"}
            >
              <Button >Register</Button>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar