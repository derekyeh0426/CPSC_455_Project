const User = require('../models/user');
const Order = require('../models/order');
const Furniture = require('../models/furniture');

const getAll = async (req, res) => {
    try {
        const orders = await Order
            .find({})
            .populate('buyer')
            .populate('seller');

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).end();
    }
};

const getById = async (req, res) => {
    try {
        const order = await Order
            .findById(req.params.id)
            .populate('buyer')
            .populate('seller');

        if (order === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(404).json({ error: 'invalid id' });
    }
};

const getByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        if (user.orders.length === 0) {
            return res.json({});
        }

        const orders = await Order
            .find()
            .where('_id')
            .in(user.orders)
            .populate('buyer')
            .populate('seller');

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(404).json({ error: 'invalid id' });
    }
};

const deleteById = async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        const buyer = await User.findById(order.buyer);
        const newBuyer = JSON.parse(JSON.stringify(buyer));
        newBuyer.orders = newBuyer.orders.filter(orderId => orderId !== req.params.id);
        await User.findByIdAndUpdate(newBuyer.id, newBuyer, { new: true });
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

const create = async (req, res) => {
    const { buyer, seller, totalAmount, paymentType, furnitures, shippingAddress } = req.body;
    try {
        const buyerObject = await User.findById(buyer);
        const sellerObject = await User.findById(seller);
        const furnitureObjects = await Furniture.find().where('_id').in(furnitures);

        if (buyerObject === null || sellerObject === null) {
            return res.status(404).json({ error: 'invalid id' });
        }

        if (!buyer || !seller || !totalAmount || !paymentType || !furnitures || furnitures.length === 0 || !shippingAddress) {
            return res.status(404).json({ error: 'bad request - cannot take null values' });
        }
        const furnitureHistory = furnitureObjects.map(furniture => ({
            name: furniture.name,
            price: furniture.price
        }));

        const order = new Order({
            buyer: buyerObject,
            seller: sellerObject,
            totalAmount: totalAmount,
            paymentType: paymentType.toLowerCase(),
            furnitureObjects: furnitureObjects,
            orderDate: new Date(),
            shippingAddress: {
                address: shippingAddress.address.trim().toLowerCase(),
                city: shippingAddress.city.trim().toLowerCase(),
                province: shippingAddress.province.trim().toLowerCase(),
                country: shippingAddress.country.trim().toLowerCase(),
                postalCode: shippingAddress.postalCode.replace(/\s+/g, '').toLowerCase()
            },
            furnitures: furnitureHistory
        });

        const savedOrder = await order.save();
        const newBuyer = JSON.parse(JSON.stringify(buyerObject));
        newBuyer.orders = newBuyer.orders.concat(savedOrder);
        await User.findByIdAndUpdate(newBuyer.id, newBuyer, { new: true });
        return res.status(200).end();
    } catch (err) {
        return res.status(400).json({ err: 'invalid id'});
    }
};

module.exports = {
    getAll,
    create,
    getById,
    getByUserId,
    deleteById,
};