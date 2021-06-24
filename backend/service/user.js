const User = require('../models/user');

const getAll = (req, res) => {
    User
        .find({})
        .then(User => res.json(User));
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

module.exports = {
    getAll,
    create
};