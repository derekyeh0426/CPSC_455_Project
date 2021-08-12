const Listing = require('../models/listing');
const User = require('../models/user');
const Furniture = require('../models/furniture');

const getAll = async (req, res) => {
    const listings = await Listing
        .find({})
        .populate('user')
        .populate('furniture')
        .populate('images');

    return res.status(200).json(listings);
};

const getById = async (req, res) => {
    try {
        const listings = await Listing
            .findById(req.params.id)
            .populate('user')
            .populate('furniture')
            .populate('images');

        if (listings === null) {
            res.status(404).json({ error: 'invalid id' });
        }

        return res.status(200).json(listings);
    } catch (error) {
        return res.status(500).end();
    }
};

// Return listings by user ID
// E.g., "/api/v1/listings/users/:userId"
const getByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user === null || user === undefined) {
            return res.status(404).json({ error: 'invalid user id' });
        }

        const listings = await Listing
            .find({})
            .populate('user')
            .populate('furniture')
            .populate('images');

        const filteredListings = listings.filter(listing => listing.user.id === user.id);

        return res.status(200).json(filteredListings);
    } catch (error) {
        return res.status(500).end();
    }
};

// Return listings based on the given type.
// E.g., "/api/v1/listings/types?type=chair".
const getByType = async (req, res) => {
    try {
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

        return res.status(200).json(filteredListings);
    } catch (error) {
        return res.status(500).end();
    }
};

// By default, return listings in ascending order.
// To retrieve in non-ascending order, pass "/api/v1/listings/createdDates?ascendingOrder=false".
const getByCreatedDateInOrder = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).end();
    }
};

const deleteById = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndRemove(req.params.id);
        
        await Furniture.findByIdAndRemove(listing.furniture);
        const user = await User.findById(listing.user);
        const newUser = JSON.parse(JSON.stringify(user));
        newUser.listings = newUser.listings.filter(listingId => listingId !== req.params.id);
        await User.findByIdAndUpdate(newUser.id, newUser, { new: true });
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

const updateById = async (req, res) => {
    try {
        const { title, images, description, type } = req.body;

        const listing = await Listing.findById(req.params.id);

        if (listing === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        const newListing = {
            title: title || listing.title,
            images: images || listing.images,
            description: description || listing.description,
            user: listing.user,
            furniture: listing.furniture,
            createdDate: listing.createdDate,
            type: type || listing.type
        };

        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, newListing, { new: true });
        return res.status(200).json(updatedListing);
    } catch (error) {
        return res.status(500).end();
    }
};

const create = async (req, res) => {
    try {
        const { title, images, description, user, furniture, type } = req.body;

        const userObject = await User.findById(user);
        const furnitureObject = await Furniture.findById(furniture);

        if (userObject === null || furnitureObject === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        if (type === undefined) {
            return res.status(404).json({ error: 'type missing' });
        }

        const listing = new Listing({
            title: title,
            images: images,
            description: description,
            user: userObject,
            furniture: furnitureObject,
            createdDate: new Date(),
            type: type
        });

        const savedListing = await listing.save();

        let listings = userObject.listings;
        listings.push(savedListing.id);

        userObject.listings = listings;

        const newUser = {
            id: userObject.id,
            name: userObject.name,
            email: userObject.email,
            listings: userObject.listings
        };

        await User.findByIdAndUpdate(newUser.id, newUser, { new: true });
        return res.status(200).json(savedListing);
    } catch (error) {
        return res.status(500).end();
    }
};

module.exports = {
    getAll,
    create,
    getById,
    getByUserId,
    getByType,
    deleteById,
    updateById,
    getByCreatedDateInOrder
};