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


async function updateGame(id, game) {
    const existing = await Game.findById(id)

    existing.name = game.name
    existing.image = game.image
    existing.price = game.price
    existing.description = game.description
    existing.genre = game.genre
    existing.platform = game.platform

    await existing.save()
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updateGame
}