const Furniture = require('../models/furniture');

const getAll = (req, res) => {
    console.log("end point get all furnitures hit");
    Furniture
        .find({})
        .then(furniture => res.json(furniture));
};

const getById = (req, res) => {
    console.log("end point get furniture by id hit")
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
    console.log("end point delete all furniture hit")
    Furniture
        .deleteMany({})
        .then(result => res.status(200).end());
};

const deleteById = (req, res) => {
    console.log("end point delete furniture by id hit")
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
    console.log("update Furniture by id hit")
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
    console.log("create new furniture end point hit")
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