import React from 'react';
import client from '../../API/api'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Container
} from '@material-ui/core'
import DisplayMyFurnitures from './DisplayMyFurnitures';

const useStyles = makeStyles((theme) => ({
    addFurnitureButton: {
        float: 'left',
        margin: 5
    }
}));

function MyFurnitures() {
    const classes = useStyles()

    return (
        <div className="grid-container">
            <Container>
                <Button className={classes.addFurnitureButton} variant="outlined" color="primary">Add Furniture</Button>
                <DisplayMyFurnitures />
            </Container>
        </div>
    )

}

export default MyFurnitures;