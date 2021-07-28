const Furniture = require('../models/furniture');

const getAll = (req, res) => {
    Furniture
        .find({})
        .then(furniture => res.json(furniture));
};

const getById = (req, res) => {
    Furniture
        .findById(req.params.id)
        .then(furniture => {
            if (furniture === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(furniture);
        })
        .catch(err => res.status(500).end());
};

const deleteAll = (req, res) => {
    Furniture
        .deleteMany({})
        .then(result => res.status(200).end());
};

const deleteById = (req, res) => {
    Furniture
        .findByIdAndRemove(req.params.id)
        .then(result => {
            if (result === null) {
                return res.status(404).end();
            }

            return res.status(200).end();
        })
        .catch(err => res.status(500));
};

const updateById = (req, res) => {
    const { name, price } = req.body;

    const furniture = {
        name: name,
        price: price
    };

    Furniture
        .findByIdAndUpdate(req.params.id, furniture, { new: true })
        .then(updatedFurniture => res.json(updatedFurniture))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

const create = (req, res) => {
    const { name, price } = req.body;

    const furniture = new Furniture({
        name: name,
        price: price
    });

    furniture
        .save()
        .then(savedFurniture => res.json(savedFurniture));
};

module.exports = {
    getAll,
    create,
    getById,
    deleteAll,
    deleteById,
    updateById
};