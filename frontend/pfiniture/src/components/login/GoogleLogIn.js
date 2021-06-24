import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLogIn extends React.Component {
    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
    }

    render(){
        return(
            <div>
                <GoogleLogin
                clientId = "897654971286-rgivsn5mcj4cs54e7j3v0fq6cm9a3dov.apps.googleusercontent.com"
                buttonText = "Log in"
                onSuccess = {this.responseGoogle}
                onFailure = {this.responseGoogle}
                cookiePolicy = {'single_host_origin'}
                />
            </div>
        )
    }
}

export default GoogleLogIn