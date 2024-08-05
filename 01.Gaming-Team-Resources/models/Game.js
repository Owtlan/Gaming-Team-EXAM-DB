const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;


const gameSchema = new Schema({
    name: { type: String, minlength: [4, 'Name must be at least 4 characters long'] },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid URL'
        }
    },
    price: { type: Number, min: [0, 'Price must be a positive number'] },
    description: { type: String, minlength: [10, 'Description must be at most 10 characters long'] },
    genre: { type: String, minlength: [2, 'The genre should be at least two characters long'] },
    platform: {
        type: String,
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX']
    },
    boughtBy: [{ type: ObjectId, ref: 'User', required: true }],
    owner: { type: ObjectId, ref: 'User', required: true },
})


const Game = model('Game', gameSchema);

module.exports = Game;