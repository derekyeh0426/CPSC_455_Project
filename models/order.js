const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderDate: {
        required: true,
        type: Date
    },
    totalAmount: {
        required: true,
        type: Number
    },
    paymentType: {
        required: true,
        type: String
    },
    furnitures: [
        {
            type: String
        },
    ],
    shippingAddress: {
        required: true,
        type: String
    }
});

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Order', orderSchema);