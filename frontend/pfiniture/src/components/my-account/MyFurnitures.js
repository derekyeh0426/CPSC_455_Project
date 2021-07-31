import React from 'react';
import {
    Container
} from '@material-ui/core';
import DisplayMyListings from './DisplayMyListings';
import AddFurnitureForm from './AddFurnitureForm';

export default function MyFurnitures() {
    return (
        <div className="grid-container">
            <Container>
                <AddFurnitureForm />
                <DisplayMyListings />
            </Container>
        </div>
    )
}