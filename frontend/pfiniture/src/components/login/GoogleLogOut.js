import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import GoogleLogout from 'react-google-login';

class GoogleLogOut extends React.Component {

    responseGoogle = (response) => {
        console.log("logOutSuccessful");
    }
    render() {
        return (
            <div>
                <GoogleLogout
                    clientId="897654971286-rgivsn5mcj4cs54e7j3v0fq6cm9a3dov.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.responseGoogle}
                ></GoogleLogout>
            </div>
        )
    }
}

export default GoogleLogOut