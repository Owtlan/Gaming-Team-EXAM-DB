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

        if (req.session.user._id.toString() == game.owner._id) {
            game.isAuthor = true;
        }else{
            game.hasBuy = game.boughtBy.find(v => v._id == req.session.user._id) != undefined

        }
    }

    res.render('details', { title: game.name, game })
})

module.exports = router