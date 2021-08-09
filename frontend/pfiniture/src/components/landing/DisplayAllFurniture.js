import React from 'react';
import './DisplayAllFurniture.css';
import {
    Container,
    IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DisplayIndividualFurniture from "./DisplayIndividualFurniture"

const useStyles = makeStyles(() => ({
    addListing: {
        bottom: '5%',
        right: '1.25%',
        position: 'fixed',
        '&:hover': {
            background: 'none',
            transform: "scale3d(1.20, 1.20, 1)"
        }
    }
}));

export default function DisplayAllFurniture() {
    const classes = useStyles()

    // TODO
    const handleAddListing = () => {
        console.log("open listing modal")
    }

    return (
        <div>
            <IconButton className={classes.addListing} onClick={handleAddListing}>
                <AddCircleOutlineIcon color="primary" style={{ fontSize: 50 }} />
            </IconButton>
            <div className="grid-container">
            <Container>
                    <DisplayIndividualFurniture/>
            </Container>
        </div>
        </div>
    )
}