import React from 'react';
import {
    Container
} from '@material-ui/core';
import DisplayMyListings from './DisplayMyListings';
import AddListingForm from './AddListingForm';

export default function MyFurnitures() {
    return (
        <div className="grid-container">
            <Container>
                <AddListingForm />
                <DisplayMyListings />
            </Container>
        </div>
    )
}