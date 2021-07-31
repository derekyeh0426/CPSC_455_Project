import { Form, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RangeSlider from 'react-bootstrap-range-slider';
import { Range } from 'react-range';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Collapse,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { temporaryFurniture } from "./TemporaryFurniture"
import client from "../../API/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 600
    },
    media: {
        height: 300,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

function getUsers() {
    client.user.getAllUsers().then(res => {
        console.log(res.data)
    })
}

function getListings() {
    client.listing.getAllListings().then(res => {
        console.log(res.data)
    })
}

function DisplayIndividualFurniture() {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const [imageFile, setimageFile] = React.useState();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    const [searchTerm, setSearchTerm] = React.useState('');
    const [typeTerm, setTypeTerm] = React.useState('');
    const [value, setValue] = React.useState(0);
    // function uploadImage(event) {
    //     event.preventDefault()
    //     console.log(imageFile[0])
    //     let imageFileObject = imageFile[0];
    //     client.image.addImage(imageFileObject).then(res => {
    //         console.log(res.data)})
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    let temFurnitureType = [
        "chair", "desk", "table", "all"
    ]
    return (
        <div>
            <Button onClick={getUsers}>Get Users</Button>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <div>
                    <span>
                        <input type="text" placeholder="search...." onChange={(event) => { setSearchTerm(event.target.value) }}></input>
                        <Form.Control
                            onClick={(event) => { setTypeTerm(event.target.value) }}
                            as="select"
                            single>
                            <option>Filter by Furniture Type</option>
                            {temFurnitureType.map((type) => {
                                return <option
                                    key={type}
                                    value={type}
                                    data-key={type}
                                    default=''
                                >
                                    {type}
                                </option>
                            })}
                        </Form.Control>
                        {/* <RangeSlider
                            value={value}
                            onChange={(event) => { setValue(event.target.value) }}
                        /> */}
                    </span>

                </div>
                    {temporaryFurniture.filter((val) => {
                        if (typeTerm == "" || typeTerm == "all") {
                            if (searchTerm == "") {
                                return val;
                            } else if (val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return val;
                            }
                        } else if (typeTerm == val.type) {
                            console.log(temporaryFurniture.length);
                            if (searchTerm == "") {
                                return val;
                            } else if (val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return val;
                            }
                        }
                    }).map((furniture, index) => {
                        if (temporaryFurniture.length === 0) {
                            return ""
                        } else {
                            return (
                                <div className="furniture-spacing">
                                    <Card key={index} className={classes.cardRoot}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={furniture.picture}
                                                title={furniture.name}
                                            />
                                        </CardActionArea>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            ${furniture.price} • {furniture.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                        </Typography>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Description: {furniture.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Type: {furniture.type}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Seller: {furniture.seller}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                        <IconButton
                                            // TODO all cards expand when only want one card to expand
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more">
                                            <ExpandMoreIcon />
                                        </IconButton>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View Seller's Profile
                                            </Button>
                                            <Button size="small" color="primary">
                                                Add to Cart
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        }
                    })}
            </Grid>
        </div>
            )
}

            export default DisplayIndividualFurniture