const User = require('../models/user');
const Cart = require('../models/cart');

const getAll = async (req, res) => {
    try {
        const cart = await Cart.find({});
        return res.json(cart);
    } catch (err) {
        return res.status(500).end();
    }
};

const getById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart === null) {
            return res.status(404).json({ error: 'invalid id' });
        }
        return res.json(cart);
    } catch (err) {
        return res.status(500).end();
    }
};

const deleteById = async (req, res) => {
    try {
        const cartObject = await Cart.findById(req.params.id);
        const newCart = JSON.parse(JSON.stringify(cartObject));
        newCart.listings.splice(0, newCart.listings.length);
        await Cart.findByIdAndUpdate(newCart.id, newCart, {new: true});
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

const updateById = async (req, res) => {
    try {
        const { listing } = req.body;
        const cart = await Cart.findById(req.params.id);
        if (listing === null || listing === undefined) {
            return res.status(400).json({ error: 'invalid listing' });
        }
        const newCart = JSON.parse(JSON.stringify(cart));
        newCart.listings = listing;
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, newCart, { new: true });
        return res.json(updatedCart);
    } catch (err) {
        return res.status(500).end();
    }
};

const create = async (req, res) => {
    try {
        const { user, listings } = req.body;
        const userObject = await User.findById(user);
        if (userObject === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        const cart = new Cart({
            user: userObject,
            listings: listings
        });

        const savedCart = await cart.save();
        const newUser = JSON.parse(JSON.stringify(userObject));
        newUser.cart = savedCart;
        await User.findByIdAndUpdate(newUser.id, newUser, { new: true });
        return res.status(200).end();
    } catch (err) {
        return res.status(400).json({ error: 'invalid id' });
    }
};

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
};