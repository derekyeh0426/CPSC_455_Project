import React from 'react'
import Table from './order-history/Table'
import DisplayMyListings from './DisplayMyListings'
import AddListingForm from './AddListingForm'
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
                        <AddListingForm/>
                        <DisplayMyListings />
                    </Container>
                </div>
            </div>
        )
    }
}