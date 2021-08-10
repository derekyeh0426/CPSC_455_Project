const User = require('../models/user');
const Order = require('../models/order');

const getAll = (req, res) => {
    Order
        .find({})
        .populate('buyer')
        .populate('seller')
        .then(order => res.json(order));
};

const getById = (req, res) => {
    Order
        .findById(req.params.id)
        .populate('buyer')
        .populate('seller')
        .then(order => {
            if (order === null) {
                return res.status(404).json({ error: 'invalid id' });
            }
            return res.json(order);
        })
        .catch(err => res.status(500).end());
};

const getByUserId = (req, res) => {
    User
        .findById(req.params.id)
        .populate('buyer')
        .populate('seller')
        .then(user => {
            if (user.orders.length === 0) {
                return res.json({});
            }
            Order.find().where('_id').in(user.orders).exec((err, records) => {
                return res.json(records);
            });
        })
}

const deleteById = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order === null) {
        return res.status(404).end();
    }

    const buyer = order.buyer;
    Order
        .findByIdAndRemove(req.params.id)
        .then(() => {
            User
                .findById(buyer)
                .then((buyerObject) => {
                    const newBuyer = JSON.parse(JSON.stringify(buyerObject));
                    newBuyer.orders = newBuyer.orders.filter(orderId => orderId !== req.params.id);
                    User
                        .findByIdAndUpdate(newBuyer.id, newBuyer, { new: true })
                        .then(() => res.status(200).end());
                })
        })
        .catch(err => res.status(500).end());
};


const create = async (req, res) => {
    const { buyer, seller, totalAmount, paymentType, furnitures, shippingAddress } = req.body;
    const buyerObject = await User.findById(buyer);
    const sellerObject = await User.findById(seller);

    if (buyerObject === null || sellerObject === null) {
        return res.status(404).json({ error: 'invalid id' });
    }

    if (!buyer || !seller || !totalAmount || !paymentType || !furnitures || furnitures.length === 0 || !shippingAddress) {
        return res.status(404).json({ error: 'bad request - cannot take null values' });
    }

    console.log(buyerObject);
    console.log(sellerObject);
    console.log(paymentType);
    console.log(furnitures);
    console.log(shippingAddress);

    const order = new Order({
        buyer: buyerObject,
        seller: sellerObject,
        totalAmount: totalAmount,
        paymentType: paymentType.toLowerCase(),
        furnitures: furnitures,
        orderDate: new Date(),
        shippingAddress: {
            address: shippingAddress.address.trim().toLowerCase(),
            city: shippingAddress.city.trim().toLowerCase(),
            province: shippingAddress.province.trim().toLowerCase(),
            country: shippingAddress.country.trim().toLowerCase(),
            postalCode: shippingAddress.postalCode.replace(/\s+/g, '').toLowerCase()
        }
    });

    console.log(order);

    order
        .save()
        .then(savedOrder => {
            console.log(savedOrder);
            const newBuyer = JSON.parse(JSON.stringify(buyerObject));
            newBuyer.orders = newBuyer.orders.concat(savedOrder);
            User
                .findByIdAndUpdate(newBuyer.id, newBuyer, { new: true })
                .then(() => res.status(200).end());
        })
        .catch(err => res.status(400).json({ error: 'invalid id' }));
};

module.exports = {
    getAll,
    create,
    getById,
    getByUserId,
    deleteById,
};