const User = require('../models/user');
const Order = require('../models/order');

const getAll = (req, res) => {
    Order
        .find({})
        .then(order => res.json(order));
};

const getById = (req, res) => {
    Order
        .findById(req.params.id)
        .then(order => {
            if (order === null) {
                return res.status(404).json({ error: 'invalid id' });
            }
            return res.json(order);
        })
        .catch(err => res.status(500).end());
};

const deleteById = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order === null) {
        return res.status(404).end();
    }

    const user = order.user;
    Order
        .findByIdAndRemove(req.params.id)
        .then(() => {
            User
                .findById(user)
                .then((userObject) => {
                    const newUser = JSON.parse(JSON.stringify(userObject));
                    console.log(req.params.id);
                    newUser.orders = newUser.orders.filter(orderId => orderId !== req.params.id);
                    User
                        .findByIdAndUpdate(newUser.id, newUser, { new: true })
                        .then(() => res.status(200).end());
                })
        })
        .catch(err => res.status(500).end());
};


const create = async (req, res) => {
    const { user, totalAmount, paymentType, furnitures} = req.body;
    const userObject = await User.findById(user);
    if (userObject === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    const order = new Order({
        user: userObject,
        totalAmount: totalAmount,
        paymentType: paymentType,
        furnitures: furnitures,
        orderDate: new Date()
    });

    order
        .save()
        .then(savedOrder => {
            const newUser = JSON.parse(JSON.stringify(userObject));
            newUser.orders = newUser.orders.concat(savedOrder);
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
};