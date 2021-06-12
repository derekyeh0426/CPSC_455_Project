import React from 'react';
import './DisplayAllFurniture.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 500
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

function Landing() {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="grid-container">
            <Container>
                <Grid container xs={12} spacing={3}>
                    <Grid item xs>
                        <Card className={classes.cardRoot}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://cdn.shopify.com/s/files/1/2419/3713/files/turntable_2020_TTXL_pu_stealth_2-min.jpg?v=11239757413589661749"
                                    title="Secretlab - Titan XL"
                                />
                            </CardActionArea>
                            <Typography gutterBottom variant="h5" component="h2">
                                Secretlab - Titan XL
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                $300
                            </Typography>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        The same award-winning comfort.
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
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Landing;