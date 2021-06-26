import React from 'react';
import "./About.css"
import image from '../../assets/FF_12.png';
import { Container } from 'react-bootstrap';

class About extends React.Component {

    render() {
        return (
            <div>
                <div className="text_art">
                    <img src={image} className="about-image"></img>
                    <h5 id="card_header">Fresh Furniture</h5>
                </div>
                <br />
                <div className="about-center">
                    <Container>
                        Fresh Furniture is a web application that aims to facilitate furniture
                        trading on the market. It will support selling, buying, and even loaning
                        second-hand or newly made furniture. Users have the option of opening
                        their own store to sell their pre-owned furniture or service to build customized
                        or fix furniture. Otherwise, users can just shop or order a service. Our app
                        will aid in reducing waste and provide affordable furniture.
                    </Container>
                    <br />
                    <Container>
                        Happy Shopping!
                    </Container>
                </div>
            </div>
        )
    }
}

export default About;