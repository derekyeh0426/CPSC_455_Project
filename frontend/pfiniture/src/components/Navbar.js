import React from 'react';
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
  },
  Name: {
    flex: 1,
    color: `#004aad`,
    marginTop: 15,
    marginRight: 15,
  }
}));

function Navbar(props) {
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
          <div className={classes.toolbarButtons}>
            {
              props.isLogIn ?
                <Link exact path to={"/cart"}>
                  <Button className={classes.cartButton}>
                    <i style={{ padding: "6px" }} className={"fas fa-shopping-cart"} />
                    <p>{props.cartQuantity}</p>
                  </Button>
                </Link> : ""
            }
            {
              props.isLogIn ?
                <Link className={classes.Name} exact path to={"/my-account"}>
                  <p>{props.name}</p>
                </Link> : ""
            }
            <GoogleLogin />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id, cartQuantity: state.cartQuantity
  }
}

export default connect(
  mapStateToProps,
)(Navbar)