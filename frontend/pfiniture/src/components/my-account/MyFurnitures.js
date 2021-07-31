import React from 'react';
import {
    Container
} from '@material-ui/core';
import DisplayMyFurnitures from './DisplayMyFurnitures';
import AddFurnitureForm from './AddFurnitureForm';

export default function MyFurnitures() {
    return (
        <div className="grid-container">
            <Container>
                <AddFurnitureForm />
                <DisplayMyFurnitures />
            </Container>
        </div>
    )
}