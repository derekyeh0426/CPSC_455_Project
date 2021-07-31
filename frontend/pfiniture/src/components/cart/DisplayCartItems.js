import React from 'react';
import {
    Grid
} from '@material-ui/core'
import '../landing/DisplayAllFurniture.css'
import { makeStyles } from '@material-ui/core/styles';

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

export default function DisplayCartItems(props) {
    let cart = Array.from(props.allCartItems);
    const classes = useStyles()

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            {cart.map((cartItem, index) => (
                "display cart items"
                // <div key={index} className="furniture-spacing">
                //     <Card key={index} className={classes.cardRoot}>
                //         <CardActionArea>
                //             <CardMedia
                //                 className={classes.media}
                //                 image={listing.images[0]}
                //                 title={listing.furniture.name}
                //             />
                //             {console.log(listing.images[0])}
                //         </CardActionArea>
                //         <Typography gutterBottom variant="h6" component="h2">
                //             ${listing.furniture.price} • {listing.furniture.name}
                //         </Typography>
                //         <Typography gutterBottom variant="h6" component="h2">
                //         </Typography>
                //         <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                //             <CardContent>
                //                 <Typography variant="body2" color="textSecondary" component="p">
                //                     Seller: {listing.user.name} ({listing.user.rating})
                //                 </Typography>
                //                 <Typography variant="body2" color="textSecondary" component="p">
                //                     Type: {listing.type}
                //                 </Typography>
                //                 <Typography variant="body2" color="textSecondary" component="p">
                //                     Description: {listing.description}
                //                 </Typography>
                //             </CardContent>
                //         </Collapse>
                //         <IconButton
                //             onClick={() => { handleExpandClick(index) }}
                //             aria-expanded={expandedId === index}
                //             aria-label="show more">
                //             <ExpandMoreIcon />
                //         </IconButton>
                //         <CardActions>
                //             <ViewSellerProfile userInfo={listing.user} />
                //             <Button size="small" color="primary">
                //                 Add to Cart
                //             </Button>
                //         </CardActions>
                //     </Card>
                // </div>
            ))}
        </Grid>
    )
}