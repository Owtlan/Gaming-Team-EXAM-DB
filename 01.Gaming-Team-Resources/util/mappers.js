function mapErrors(err) {

    if (Array.isArray(err)) {
        return err;
    } else if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message === 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }]
    }

}


function gameViewModel(game) {
    return {
        _id: game._id,
        name: game.name,
        image: game.image,
        price: game.price,
        description: game.description,
        genre: game.genre,
        platform: game.platform
    }
}

module.exports = {
    mapErrors,
    gameViewModel
}