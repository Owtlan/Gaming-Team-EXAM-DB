const Game = require('../models/Game');

async function createPost(gameData) {
    const result = new Game(gameData)

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