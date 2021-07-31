import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import {Toolbar, Button }from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import image from "../assets/FF_12.png";
import CheckOut from './payment/CheckOut'
import GoogleLogin from './login/GoogleLogIn'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: `#c7e7e8`
  },
  link: {
    flex: 1,
    color: `#004aad`,
  },
  logo: {
    maxWidth: 60,
  },
  toolbarButtons: {
    display: 'flex',
    marginLeft: 'auto'
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Link to={"/"}>
          <img src={image} alt="FF Logo" className={classes.logo}/>
          </Link>
            <Link to={"/"}>
              <Button className={classes.link}>Home</Button>
            </Link>
            <Link to={"/about"}>
              <Button className={classes.link}>About</Button>
            </Link>
            <Link exact path to={"/my-account"}>
              <Button className={classes.link}>My Account</Button>
            </Link>
          <div className={classes.toolbarButtons}>
            <CheckOut />
            <GoogleLogin />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
      isLogIn: state.isLogIn, name: state.name, email: state.email
  }
}

export default connect(
  mapStateToProps,
)(Navbar)