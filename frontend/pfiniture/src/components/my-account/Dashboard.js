import React from 'react'
import Table from './Table'
import DisplayMyListings from './DisplayMyListings'
import AddFurnitureForm from './AddFurnitureForm'
import {
    Container
} from '@material-ui/core'

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h2>My Orders</h2>
                <Table />
                <br/>
                <h2>My Listings</h2>
                <div className="grid-container">
                    <Container>
                        <AddFurnitureForm/>
                        <DisplayMyListings />
                    </Container>
                </div>
            </div>
        )
    }
}