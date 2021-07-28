const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const getAll = (req, res) => {
    User
        .find({})
        .then(User => res.json(User));
};

const deleteAll = (req, res) => {
    User
        .deleteMany({})
        .then(result => res.status(200).end());
};

async function create (req, res) {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email} = ticket.getPayload(); 

    const user = new User({
        name: name,
        email: email
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
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(user);
        })
        .catch(err => res.status(500).end());
}

const updateById = async (req, res) => {
    const { rating } = req.body;

    const user = await User.findById(req.params.id);

    if (user === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    console.log(user);

    const newUser = {
        name: user.name,
        email: user.email,
        listings: user.listings,
        rating: rating > 10 ? 10 : rating
    };

    User
        .findByIdAndUpdate(req.params.id, newUser, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

module.exports = {
    getAll,
    create,
    deleteAll,
    deleteById,
    getById,
    updateById
};