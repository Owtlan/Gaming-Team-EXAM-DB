const router = require('express').Router()



router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' })
})


module.exports = router