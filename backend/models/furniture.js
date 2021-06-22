const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    owner: {
        // TODO: Change to required set to true after creating User schema.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

furnitureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Furniture', furnitureSchema);