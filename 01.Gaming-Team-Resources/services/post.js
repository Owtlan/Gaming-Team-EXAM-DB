const Game = require('../models/Game');

async function createPost(game) {
    const result = new Game(game)

    await result.save()
    return result
}



async function getPosts() {
    return Game.find({})
}


async function getPostById(id) {

    return Game.findById(id).populate('owner', 'username email')
}


module.exports = {
    getPosts,
    getPostById,
    createPost
}