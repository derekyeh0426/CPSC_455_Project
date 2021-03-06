//referenced from https://zoejoyuliao.medium.com/add-google-sign-in-and-sign-out-to-your-react-app-and-get-the-accesstoken-2ee16bfd8297
import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import UserLogInAction from '../../redux/users/UserLogInAction'
import UserLogOutAction from '../../redux/users/UserLogOutAction';
import { connect } from 'react-redux'
import client from '../../API/api'
import './LogInForm.css'
import { refreshTokenSetup } from '../../utility';
import {NotificationManager} from "react-notifications";
import { TIME_OUT } from '../../constants';
import { getCartQuantity } from '../../helpers';
require('dotenv').config()
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID


class GoogleLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            accessToken: ''
        }
        this.handleSuccessfulLogIn = this.handleSuccessfulLogIn.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.handleSuccessfulLogOut = this.handleSuccessfulLogOut.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    handleSuccessfulLogIn = (response) => {
        refreshTokenSetup(response);
        const newUser = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            token: response.tokenId,
            location: undefined
        }


        client.user.addUsers(newUser).then(res => {
            client.user.getUserById(res.data.id).then(buyerInfo => {
                let cartNum = 0;
                const cart = buyerInfo.data.cart;
                if (!cart) {
                    cartNum = 0;
                } else {
                    cartNum = cart.listings.length;
                }
                const reduxUser = {
                    name: response.profileObj.name,
                    email: response.profileObj.email,
                    id: res.data.id,
                    cartQuantity: cartNum
                }
                this.props.UserLogInAction(reduxUser)
            })
            this.setState({ accessToken: newUser.token, isLogined: true });
        });
    }

    handleSuccessfulLogOut = (response) => {
        this.setState({accessToken: '', isLogined: false})
        this.props.UserLogOutAction();
    }

    handleLoginFailure(response) {
        NotificationManager.error("Login unsuccessful, please try it again", "", TIME_OUT)
    }


    handleLogoutFailure(response) {
        NotificationManager.error("Log out unsuccessful, please try it again", "", TIME_OUT)
    }


    render() {
        return (
            <div>
                {this.state.isLogined ?
                    <GoogleLogout
                        clientId = "897654971286-mmm9opi6prrb9s8c0fe0qha1iqhr22uk.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.handleSuccessfulLogOut}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout>
                    :
                    <GoogleLogin className="google-login-button"
                        clientId = "897654971286-mmm9opi6prrb9s8c0fe0qha1iqhr22uk.apps.googleusercontent.com"
                        buttonText="Log in with Google!"
                        onSuccess={this.handleSuccessfulLogIn}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email
    }
}

const mapDispatchToProps = {
    UserLogInAction,
    UserLogOutAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleLogIn)