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



module.exports = router