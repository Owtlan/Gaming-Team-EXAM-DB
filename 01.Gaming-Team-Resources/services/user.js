const User = require('../models/User');
const { hash, compare } = require('bcrypt')


async function register(username, email, password) {
    const existing = await getUserByUsername(username)

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        email,
        hashedPassword
    });

    await user.save();

    return user;
}

//LOGIN
async function login(username, password) {
    const user = await getUserByUsername(username)

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = compare(password, user.hashedPassword)


    if (!hasMatch) {
        throw new Error('Incorrect username or password');
    }

    return user

}



//getting user
async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    return user
}


module.exports = {
    register,
    login
}