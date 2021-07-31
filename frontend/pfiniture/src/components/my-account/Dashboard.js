import React from 'react'
import Table from './Table'
import DisplayMyFurnitures from './DisplayMyFurnitures'
import AddFurnitureForm from './AddFurnitureForm'
import {
    Container
} from '@material-ui/core'


class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h2>My Orders</h2>
                <Table />
                <br/>
                <h2>My Furnitures</h2>
                <div className="grid-container">
                    <Container>
                        <AddFurnitureForm/>
                        <DisplayMyFurnitures />
                    </Container>
                </div>
            </div>
        )
    }
}

export default Dashboard;