import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
    IconButton,
    Collapse,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { temporaryFurniture } from "./TemporaryFurniture"
import client from "../../API/api";
import ImageUpload from '../ImageUpload';

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


function DisplayIndividualFurniture() {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const [imageFile, setimageFile] = React.useState();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

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

    return (
        <div>
            <Button onClick={getUsers}>Get Users</Button>
            <ImageUpload />
            {/* <form method="post" enctype="multipart/form-data">
                    <label for="file">Choose a file</label>
                    <input 
                        type="file"
                        name="photo" 
                        onChange={event => setimageFile(event.target.files)} 
                        />
                <button onClick={event => uploadImage(event)}>Send the file</button>
                </form> */}

            {/* <form onSubmit={e => handleSubmit(e)} action="http://localhost:8080/api/v1/images" method="POST" enctype="multipart/form-data"> */}
            {/* <form> */}
                {/* <div class="form-group">
                    <label for="featuredImage">Featured Image</label>
                    <input 
                        type="file" 
                        name="photo"
                        onChange={e => setimageFile(e.target.files)}
                        />
                </div> */}
                {/* <button type="submit">Send the file</button> */}
                {/* <input type="submit" value="Submit" 
                /> */}
            {/* </form> */}
            <Grid container xs={12} spacing={1}>
                {temporaryFurniture.map((furniture, index) => {
                    if (temporaryFurniture.length === 0) {
                        return ""
                    } else {
                        return (
                            <Grid item xs key={index}>
                                <Card className={classes.cardRoot}>
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
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
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
                            </Grid>
                        )
                    }
                })}
            </Grid>
        </div>
    )
}

export default DisplayIndividualFurniture