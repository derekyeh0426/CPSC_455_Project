const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);