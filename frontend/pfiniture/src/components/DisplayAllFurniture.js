import React from 'react';
import './DisplayAllFurniture.css';
import {
    Container
} from '@material-ui/core'
import DisplayIndividualFurniture from "./DisplayIndividualFurniture"

function Landing() {

    return (
        <div className="grid-container">
            <Container>
                    <DisplayIndividualFurniture />
            </Container>
        </div>
    )
}

export default Landing;