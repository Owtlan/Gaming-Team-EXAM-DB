const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;


const gameSchema = new Schema({
    name: { type: String, minlength: [6, 'Name must be at least 6 characters long'] },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid URL'
        }
    },
    price: { type: Number },
    description: { type: String, minlength: [8, 'Description must be at most 8 characters long'] },
    genre: { type: String },
    platform: {
        type: String,
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX']
    },
    boughtBy: [{
        type: ObjectId,
        ref: 'User'
    }],
    owner: { type: ObjectId, ref: 'User', required: true },
})


const Game = model('Game', gameSchema);

module.exports = Game;