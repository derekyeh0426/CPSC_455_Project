const Listing = require('../models/listing');
const User = require('../models/user');
const Furniture = require('../models/furniture');

const getAll = (req, res) => {
    Listing
        .find({})
        .then(listing => res.json(listing));
};

const getById = (req, res) => {
    Listing
        .findById(req.params.id)
        .then(listing => {
            if (listing === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(listing);
        })
        .catch(err => res.status(500).end());
};

const deleteById = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing === null) {
        return res.status(404).end();
    }

    const user = listing.user;
    const furniture = listing.furniture;

    Listing
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(user);

            User
                .findByIdAndRemove(user)
                .then(() => {
                    console.log(furniture);

                    Furniture
                        .findByIdAndRemove(furniture)
                        .then(() => res.status(200).end());
                })
        })
        .catch(err => res.status(500).end());
};

const updateById = async (req, res) => {
    const { title, images, description } = req.body;

    const listing = await Listing.findById(req.params.id);

    if (listing === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    console.log(listing);

    const newListing = {
        title: title,
        images: images,
        description: description,
        user: listing.user,
        furniture: listing.furniture,
        createdDate: listing.createdDate,
    };

    Listing
        .findByIdAndUpdate(req.params.id, newListing, { new: true })
        .then(updatedListing => res.json(updatedListing))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

const create = async (req, res) => {
    const { title, images, description, user, furniture } = req.body;

    const userObject = await User.findById(user);
    const furnitureObject = await Furniture.findById(furniture);
    
    console.log(userObject);
    console.log(furnitureObject);

    if (userObject === null || furnitureObject === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    const listing = new Listing({
        title: title,
        images: images,
        description: description,
        user: userObject,
        furniture: furnitureObject,
        createdDate: new Date(),
    });

    listing
        .save()
        .then(savedListing => {
            let listings = userObject.listings;

            listings.push(savedListing.id);

            userObject.listings = listings;

            const newUser = {
                id: userObject.id,
                name: userObject.name,
                email: userObject.email,
                listings: userObject.listings
            };

            User
                .findByIdAndUpdate(newUser.id, newUser, { new: true })
                .then(() => res.status(200).end());
        })
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
};