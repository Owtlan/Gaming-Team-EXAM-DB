
const router = require('express').Router()
const { isUser } = require('../middleware/guards')
const { createPost } = require('../services/post')
const { mapErrors, gameViewModel } = require('../util/mappers')
const Game = require('../models/Game');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post' })
})

router.post('/create', isUser(), async (req, res) => {
    const gameData = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        platform: req.body.platform,
        owner: req.session.user._id
    };
    try {
        await createPost(gameData)
        res.redirect('/catalog');
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Post', errors, data: gameData });
    }
});

router.post('/buy/:id', async (req, res) => {
    const gameId = req.params.id;
    const userId = req.session.user._id


    try {
        const game = await Game.findById(gameId);

        if (!game) {
            throw new Error('Game not found');
        }

        if (game.owner.equals(userId)) {
            throw new Error('You cannot buy your own game');
        }

        if (game.boughtBy.includes(userId)) {
            throw new Error('You have already bought this game');
        }

        // Добавяне на потребителя в boughtBy
        game.boughtBy.push(userId);
        await game.save();

        res.redirect(`/catalog/${gameId}`);
    } catch (error) {
        const errors = mapErrors(error);
        res.render('details', { title: 'Error', game: await gameViewModel(Game.findById(gameId)), errors });
    }


})

module.exports = router