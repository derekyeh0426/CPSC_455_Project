const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const getAll = (req, res) => {
    User
        .find({})
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .populate('ratedUsers')
        .populate('commentedUsers')
        .then(User => res.json(User));
};

const deleteAll = (req, res) => {
    User
        .deleteMany({})
        .then(result => res.status(200).end());
};

async function create (req, res) {
    let { token, name, email, location, cart, order } = req.body;

    if (token !== undefined) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        name = ticket.getPayload().name;
        email = ticket.getPayload().email;
    }

    // Check for email duplicates.
    let users = await User.find({});
    users = users.filter(user => user.email === email);

    // User with the given email already exists, so return the user.
    if (users.length > 0) {
        return res.status(200).json(users[0]);
    }

    const user = new User({
        name: name,
        email: email,
        cart: cart,
        order: order,
        location: location || 'Vancouver'
    });

    user
        .save().then(savedUser => res.json(savedUser));
};

const deleteById = (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(result => {
            if (result === null) {
                return res.status(404).end();
            }

            return res.status(200).end();
        })
        .catch(err => res.status(500));
};

const getById = (req, res) => {
    User
        .findById(req.params.id)
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .populate('ratedUsers')
        .populate('commentedUsers')
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(user);
        })
        .catch(err => res.status(500).end());
};

// Return users based on the given location.
// E.g., "/api/v1/users/locations?location=coquitlam".
const getByLocation = async (req, res) => {
    const { location } = req.query;

    User
        .find({})
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .populate('ratedUsers')
        .populate('commentedUsers')
        .then(users => {
            const userResult = [];

            users.forEach(user => {
                if (user.location.toLowerCase() === location.toLowerCase()) {
                    userResult.push(user);
                }
            });

            return res.status(200).json(userResult);
        })
        .catch(err => res.status(500).end());
};

// Return users based on the given email.
// E.g., "/api/v1/users/emails?email=admin@gmail.com".
const getByEmail = async (req, res) => {
    const { email } = req.query;

    User
        .find({})
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .populate('ratedUsers')
        .populate('commentedUsers')
        .then(users => {
            users.forEach(user => {
                if (user.email === email) {
                    return res.status(200).json(user);
                }
            });

            return res.status(404).json({ error: 'invalid email' });
        })
        .catch(err => res.status(500).end());
};

const getAllRatingsByUserId = (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            return res.status(200).json({
                ratings: user.ratings,
                overall: user.ratings.length === 0
                    ? 0
                    : user.ratings.reduce((a, b) => a + b.rating, 0) / user.ratings.length
            });
        })
        .catch(() => res.status(404).json({ error: 'invalid id' }));
};

const getAllCommentsByUserId = async (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            return res.status(200).json(user.comments);
        })
        .catch(() => res.status(404).json({ error: 'invalid id' }));
};

const updateById = async (req, res) => {
    const { name, listings, rating, location } = req.body;

    const user = await User.findById(req.params.id);

    if (rating === undefined || isNaN(rating) || rating < 0) {
        return res.status(404).json({ error: 'invalid rating' });
    }

    if (user === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    console.log((rating > 5 ? 5 : rating))

    const newUser = {
        name: name || user.name,
        listings: listings || user.listings,
        rating: (rating > 5 ? 5 : rating),
        location: location || user.location
    };

    console.log(newUser);

    User
        .findByIdAndUpdate(req.params.id, newUser, { new: true })
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .populate('ratedUsers')
        .populate('commentedUsers')
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

const rateUserById = async (req, res) => {
    const buyer = req.params.buyer;
    const { seller, rating } = req.body;

    console.log(`buyer[${buyer}], seller[${seller}], rating[${rating}]`);

    if (!buyer || !seller || rating === undefined || isNaN(rating)) {
        return res.status(404).json({error: 'bad request - cannot take null values'});
    }

    const buyerObject = await User.findById(buyer);
    const sellerObject = await User.findById(seller);

    if (buyerObject === null || sellerObject === null) {
        return res.status(404).json({error: 'invalid id'});
    }

    // Add sellerObject to the buyerObject's list of rated users.
    // Must check if the buyer has rated the seller already.
    // If already rated, just update the ratings. Otherwise, add the rating.
    const newBuyerObject = JSON.parse(JSON.stringify(buyerObject));
    let oldRating = 0;

    let alreadyRated = false;
    newBuyerObject.ratedUsers.forEach(ratedUser => {
        if (ratedUser.user === seller) {
            oldRating = ratedUser.rating;
            alreadyRated = true;
        }
    });

    // Remove the seller from the rated users and the buyer from the seller's rating list if already rated.
    const newSellerObject = JSON.parse(JSON.stringify(sellerObject));
    if (alreadyRated) {
        newBuyerObject.ratedUsers = newBuyerObject.ratedUsers.filter(ratedUser => ratedUser.user !== seller);
        newSellerObject.ratings = newSellerObject.ratings.filter(rating => rating.user !== buyer);
    }

    // Update buyer's list of rated sellers and seller's rating list.
    newBuyerObject.ratedUsers = newBuyerObject.ratedUsers.concat({
        user: seller,
        rating: (rating > 5) ? 5 : rating
    });

    newSellerObject.ratings = newSellerObject.ratings.concat({
        user: buyer,
        rating: (rating > 5) ? 5 : rating
    });

    User
        .findByIdAndUpdate(newSellerObject.id, newSellerObject, {new: true})
        .then(() => {
            User
                .findByIdAndUpdate(newBuyerObject.id, newBuyerObject, {new: true})
                .then(() => res.status(200).end());
        });
};

const commentUserById = async (req, res) => {
    const buyer = req.params.buyer;
    const { seller, comment } = req.body;

    console.log(`buyer[${buyer}], seller[${seller}], comment[${comment}]`);

    if (!buyer || !seller || !comment) {
        return res.status(404).json({error: 'bad request - cannot take null values'});
    }

    const buyerObject = await User.findById(buyer);
    const sellerObject = await User.findById(seller);

    if (buyerObject === null || sellerObject === null) {
        return res.status(404).json({error: 'invalid id'});
    }

    const newBuyerObject = JSON.parse(JSON.stringify(buyerObject));
    const newSellerObject = JSON.parse(JSON.stringify(sellerObject));

    let alreadyCommented = false;
    newBuyerObject.commentedUsers.forEach(commentedUser => {
        if (commentedUser.user === seller) {
            alreadyCommented = true;
        }
    });

    // Remove the seller from the commented users and buyer from the seller's list of comments if already commented.
    if (alreadyCommented) {
        newBuyerObject.commentedUsers = newBuyerObject.commentedUsers.filter(commentedUser => commentedUser.user !== seller);
        newSellerObject.comments = newSellerObject.comments.filter(comment => comment.user !== buyer);
    }

    newBuyerObject.commentedUsers = newBuyerObject.commentedUsers.concat({
        user: seller,
        comment: comment
    });

    newSellerObject.comments = newSellerObject.comments.concat({
        user: buyer,
        comment: comment
    });

    User
        .findByIdAndUpdate(newSellerObject.id, newSellerObject, {new: true})
        .then(() => {
            User
                .findByIdAndUpdate(newBuyerObject.id, newBuyerObject, {new: true})
                .then(() => res.status(200).end());
        });
};

module.exports = {
    getAll,
    getAllRatingsByUserId,
    getAllCommentsByUserId,
    create,
    deleteAll,
    deleteById,
    getById,
    updateById,
    getByEmail,
    getByLocation,
    rateUserById,
    commentUserById,
};