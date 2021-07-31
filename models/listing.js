const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        required: true,
        type: String
    },
    furniture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Furniture'
    },
    createdDate: {
        required: true,
        type: Date
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    description: {
        type: String
    },
    type: {
        required: true,
        type: String
    }
});

listingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Listing', listingSchema);