const Listing = require('../models/listing');
const User = require('../models/user');
const Furniture = require('../models/furniture');

const getAll = (req, res) => {
    Listing
        .find({})
        .populate('user')
        .populate('furniture')
        .populate('images')
        .then(listing => res.json(listing));
};

const getById = (req, res) => {
    Listing
        .findById(req.params.id)
        .populate('user')
        .populate('furniture')
        .populate('images')
        .then(listing => {
            if (listing === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(listing);
        })
        .catch(err => res.status(500).end());
};

// Return listings based on the given type.
// E.g., "/api/v1/listings/types?type=chair".
const getByType = async (req, res) => {
    const { type } = req.query;

    if (type === undefined) {
        return res.status(400).end();
    }

    const listings = await Listing
        .find({})
        .populate("user")
        .populate("furniture")
        .populate("images");

    const filteredListings = listings.filter(listing => listing.type.toLowerCase() === type.toLowerCase());

    console.log(filteredListings)

    return res.status(200).json(filteredListings);
};

// By default, return listings in ascending order.
// To retrieve in non-ascending order, pass "/api/v1/listings/createdDates?ascendingOrder=false".
const getByCreatedDateInOrder = async (req, res) => {
    const { ascendingOrder } = req.query;

    const listings = await Listing
        .find({})
        .populate("user")
        .populate("furniture")
        .populate("images");

    // By default, it returns listings in ascending order.
    if (ascendingOrder === undefined || ascendingOrder.toLowerCase() === "true") {
        listings.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
        return res.status(200).json(listings);
    }

    listings.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
    return res.status(200).json(listings);
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
            console.log(furniture);

            Furniture
                .findByIdAndRemove(furniture)
                .then(() => {
                    console.log(user);

                    User
                        .findById(user)
                        .then(userObject => {
                            const newUser = JSON.parse(JSON.stringify(userObject));
                            newUser.listings = newUser.listings.filter(listingId => listingId !== req.params.id);

                            User
                                .findByIdAndUpdate(newUser.id, newUser, { new: true })
                                .then(() => res.status(200).end());
                        })
                })
        })
        .catch(err => res.status(500).end());
};

const updateById = async (req, res) => {
    const { title, images, description, type } = req.body;

    const listing = await Listing.findById(req.params.id);

    if (listing === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    console.log(listing);

    const newListing = {
        title: title || listing.title,
        images: images || listing.images,
        description: description || listing.description,
        user: listing.user,
        furniture: listing.furniture,
        createdDate: listing.createdDate,
        type: type || listing.type
    };

    Listing
        .findByIdAndUpdate(req.params.id, newListing, { new: true })
        .then(updatedListing => res.json(updatedListing))
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

const create = async (req, res) => {
    console.log("create")
    const { title, images, description, user, furniture, type } = req.body;

    const userObject = await User.findById(user);
    const furnitureObject = await Furniture.findById(furniture);

    console.log("after user, furniture");

    // console.log(userObject);
    // console.log(furnitureObject);

    if (userObject === null || furnitureObject === null) {
        console.log("not found")
        return res.status(404).json({ error: 'invalid id' });
    }

    if (type === undefined) {
        console.log("no type")
        return res.status(404).json({ error: 'type missing' });
    }

    console.log("before creation")

    const listing = new Listing({
        title: title,
        images: images,
        description: description,
        user: userObject,
        furniture: furnitureObject,
        createdDate: new Date(),
        type: type
    });

    console.log("created listing")

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
    getByType,
    deleteById,
    updateById,
    getByCreatedDateInOrder
};