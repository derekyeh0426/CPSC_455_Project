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
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.responseGoogle}
                ></GoogleLogout>
            </div>
        )
    }
}

export default GoogleLogOut