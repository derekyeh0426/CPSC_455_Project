import React from 'react';
import './DisplayAllFurniture.css';
import {Container} from '@material-ui/core'
import DisplayIndividualFurniture from "./DisplayIndividualFurniture"


export default function DisplayAllFurniture() {
    return (
        <div>
            <div className="grid-container">
            <Container>
                    <DisplayIndividualFurniture/>
            </Container>
        </div>
        </div>
    )
}