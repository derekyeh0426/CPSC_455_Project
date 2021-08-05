const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const getAll = (req, res) => {
    User
        .find({})
        .populate('listings')
        .populate('cart')
        .populate('orders')
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

const updateById = async (req, res) => {
    const { name, listings, rating, location } = req.body;

    const user = await User.findById(req.params.id);

    if (user === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    console.log(user);

    const newUser = {
        name: name || user.name,
        listings: listings || user.listings,
        rating: (rating > 10 ? 10 : rating) || user.rating,
        location: location || user.location
    };

    User
        .findByIdAndUpdate(req.params.id, newUser, { new: true })
        .populate('listings')
        .populate('cart')
        .populate('orders')
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

module.exports = {
    getAll,
    create,
    deleteAll,
    deleteById,
    getById,
    updateById,
    getByEmail,
    getByLocation
};