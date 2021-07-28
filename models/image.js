const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    key: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    }
});

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Image', imageSchema);