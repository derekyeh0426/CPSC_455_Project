import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import image from "../assets/FF_12.png";
import GoogleLogin from './login/GoogleLogIn'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: `#c7e7e8`,
    top: 0,
    position: 'fixed !important'
  },
  link: {
    flex: 1,
    color: `#004aad`,
  },
  cartButton: {
    margin: 5,
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
    <div style={{ paddingTop: 68 }}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Link to={"/"}>
            <img src={image} alt="FF Logo" className={classes.logo} />
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
            <Link exact path to={"/cart"}>
              <Button className={classes.cartButton}>
                  <i style={{padding: "6px"}}className={"fas fa-shopping-cart"} />
              </Button>
            </Link>
            <GoogleLogin />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id
  }
}

export default connect(
  mapStateToProps,
)(Navbar)