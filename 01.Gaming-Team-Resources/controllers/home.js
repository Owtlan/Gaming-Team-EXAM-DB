const { getPostById, getPosts } = require('../services/post')

const { gameViewModel } = require('../util/mappers')


const router = require('express').Router()



router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' })
})


router.get('/catalog', async (req, res) => {

    const games = (await getPosts()).map(gameViewModel)
    res.render('catalog', { title: 'Catalog', games })
})

router.get('/catalog/:id', async (req, res) => {
    const id = req.params.id;
    const game = gameViewModel(await getPostById(id))


    if (req.session.user) {
        game.hasUser = true
        if (req.session.name._id == this.post.owner._id) {
            post.isAuthor = true;
        }
    }

    res.render('details', { title: post.title, game })
})

module.exports = router