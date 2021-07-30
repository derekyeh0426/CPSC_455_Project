//referenced from https://zoejoyuliao.medium.com/add-google-sign-in-and-sign-out-to-your-react-app-and-get-the-accesstoken-2ee16bfd8297
import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import logIn from '../../redux/users/userActions'
import userLogOutAction from '../../redux/users/userLogOutAction';
import { connect } from 'react-redux'
import client from '../../API/api'
import './LogInForm.css'
import { refreshTokenSetup } from '../../utility';
import GOOGLE_CLIENT_ID from '../../googleID'

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

    componentDidMount(){
        console.log(process.env.GOOGLE_CLIENT_ID);
        console.log(this.props.name);
        console.log(this.props.email);
    }

    handleSuccessfulLogIn = (response) => {
        refreshTokenSetup(response);
        this.props.logIn(response.profileObj)
        const newUser = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            token: response.tokenId
        }

        client.user.addUsers(newUser).then(res => {
            console.log(res.data);
            this.setState({ accessToken: newUser.token, isLogined: true });
            console.log(this.state.isLogined);
            client.user.getAllUsers().then(res => {
                console.log(res.data)
            })
        });
    }

    handleSuccessfulLogOut = (response) => {
        this.setState({accessToken: '', isLogined: false})
        this.props.userLogOutAction();
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }


    handleLogoutFailure(response) {
        alert('Failed to log out')
    }


    render() {
        return (
            <div>
                {this.state.isLogined ?
                    <GoogleLogout
                        clientId= {GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.handleSuccessfulLogOut}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout>
                    :
                    <GoogleLogin className="google-login-button"
                        clientId= {GOOGLE_CLIENT_ID}
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
    logIn,
    userLogOutAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleLogIn)