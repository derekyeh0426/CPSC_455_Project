const User = require('../models/user');
const Cart = require('../models/cart');

const getAll = (req, res) => {
    Cart
        .find({})
        .then(cart => res.json(cart));
};

const getById = (req, res) => {
    Cart
        .findById(req.params.id)
        .then(cart => {
            if (cart === null) {
                return res.status(404).json({ error: 'invalid id' });
            }
            return res.json(cart);
        })
        .catch(err => res.status(500).end());
};

const deleteById = async (req, res) => {
    const cartObject = await Cart.findById(req.params.id);
    const newCart = JSON.parse(JSON.stringify(cartObject));
    console.log(newCart);
    newCart.listing.splice(0, newCart.listing.length);
    Cart
        .findByIdAndUpdate(newCart.id, newCart, { new: true })
        .then(() => res.status(200).end());
};

const updateById = async (req, res) => {
    Cart
        .findById(req.params.id)
        .then(cart => {
            const { listing } = req.body;
            if (listing === null || listing === undefined) {
                return res.status(400).json({ error: 'invalid listing' });
            }
            const newCart = JSON.parse(JSON.stringify(cart));
            newCart.listings = [...cart.listings, listing];
            Cart
                .findByIdAndUpdate(req.params.id, newCart, { new: true})
                .then(updatedCart => res.json(updatedCart))
        })
};

const create = async (req, res) => {
    const { user, listing } = req.body;
    const userObject = await User.findById(user);
    if (userObject === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    const cart = new Cart({
        user: userObject,
        listings: [listing]
    })

    cart
        .save()
        .then(savedCart => {
            // console.log(userObject);
            const newUser = JSON.parse(JSON.stringify(userObject));
            newUser.cart = savedCart;
            User
                .findByIdAndUpdate(newUser.id, newUser, { new: true })
                .then(() => {
                    console.log(savedCart);
                    res.json(savedCart)
                    res.status(200).end()
                });
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