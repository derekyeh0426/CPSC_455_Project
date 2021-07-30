const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
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