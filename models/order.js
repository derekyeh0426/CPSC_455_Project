const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number
    },
    seller: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
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
    furnitureObjects: [
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Furniture'
        },
    ],
    shippingAddress: {
        address: {
            required: true,
            type: String
        },
        city: {
            required: true,
            type: String
        },
        province: {
            required: true,
            type: String
        },
        country: {
            required: true,
            type: String
        },
        postalCode: {
            required: true,
            type: String
        }
    },
    furnitures: [
        {
            name: {
                type: String
            },
            price: {
                type: String
            }
        }
    ]
});

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', start_seq: 1000 });

module.exports = mongoose.model('Order', orderSchema);