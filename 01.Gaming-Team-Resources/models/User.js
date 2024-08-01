const { Schema, model } = require('mongoose');


const NAME_PATTERN = /^[a-zA-Z-]+$/
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/


const userSchema = new Schema({

    username: {
        type: String, minlength: [5, 'First name must be at least 3 characters long'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value)
            },
            message: 'First name may contain only english letters'
        }
    },
    email: {
        type: String, required: [true, 'Email is required'], validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value)
            },
            message: 'Email must be valid and may contain only english letters'
        }
    },
    hashedPassword: { type: String, required: true }
})


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2,
    }
})

const User = model('User', userSchema);

module.exports = User;