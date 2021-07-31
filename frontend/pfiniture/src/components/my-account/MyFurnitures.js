import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Container
} from '@material-ui/core'
import DisplayMyFurnitures from './DisplayMyFurnitures';
import ImageUpload from './ImageUpload';

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
                <ImageUpload />
                <DisplayMyFurnitures />
            </Container>
        </div>
    )

}

export default MyFurnitures;