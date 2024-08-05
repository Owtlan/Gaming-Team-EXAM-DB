const router = require('express').Router()
const { isUser } = require('../middleware/guards')
const { createPost, getPostById, updateGame, deleteGame } = require('../services/post')
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


router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id
    const game = gameViewModel(await getPostById(id))


    if (req.session.user._id != game.owner._id) {

        return res.redirect('/login')
    }
    res.render('edit', { title: 'Edit Post', game })

})


router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = gameViewModel(await getPostById(id))


    if (req.session.user._id != existing.owner._id) {
        return res.redirect('/login')
    }

    const game = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        platform: req.body.platform,
    }

    try {
        await updateGame(id, game)
        res.redirect('/catalog/' + id)
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err)
        game._id = id
        res.render('edit', { title: 'Edit Post', game, errors });
    }
})

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = gameViewModel(await getPostById(id))

    if (req.session.user._id != existing.owner._id) {
        return res.redirect('/login')
    }

    try {
        await deleteGame(id)
        res.redirect('/catalog')
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err)
        res.render('details', { title: existing.title, errors });
    }
})

router.get('/404', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})
module.exports = router