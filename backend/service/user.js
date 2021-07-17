const User = require('../models/user');

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

const create = (req, res) => {
    const { name, email } = req.body;

    const user = new User({
        name: name,
        email: email
    });

    user
        .save()
        .then(savedUser => res.json(savedUser));
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

module.exports = {
    getAll,
    create,
    deleteAll,
    deleteById
};