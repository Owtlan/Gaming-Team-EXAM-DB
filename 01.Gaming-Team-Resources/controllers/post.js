
const router = require('express').Router()
const { isUser } = require('../middleware/guards')


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post' })
})

router.post('/create', isUser(), async (req, res) => {
    try {
        const gameData = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            genre: req.body.genre,
            platform: req.body.platform,
            owner: req.session.user._id
        };
        const game = new Game(gameData);
        await game.save();
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', { title: 'Create Post', errors: err.errors, data: req.body });
    }
});
module.exports = router