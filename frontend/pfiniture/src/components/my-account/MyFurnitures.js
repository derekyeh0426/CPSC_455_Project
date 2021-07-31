import React from 'react';
import {
    Container
} from '@material-ui/core';
import DisplayMyFurnitures from './DisplayMyFurnitures';
import DisplayMyListings from './DisplayMyListings';
import AddFurnitureForm from './AddFurnitureForm';

export default function MyFurnitures() {
    return (
        <div className="grid-container">
            <Container>
                <AddFurnitureForm />
                <DisplayMyFurnitures />
                <DisplayMyListings />
            </Container>
        </div>
    )
}