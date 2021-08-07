const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    listings: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
        }
    ]
});

cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Cart', cartSchema);