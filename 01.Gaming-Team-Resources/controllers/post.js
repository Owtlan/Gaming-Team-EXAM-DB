
const router = require('express').Router()
const { isUser } = require('../middleware/guards')
const { createPost } = require('../services/post')
const { mapErrors } = require('../util/mappers')

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
module.exports = router