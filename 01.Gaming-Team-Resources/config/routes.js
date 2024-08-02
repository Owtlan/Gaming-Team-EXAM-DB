const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const gameController = require('../controllers/post')


module.exports = (app) => {
    app.use(homeController)
    app.use(authController)
    app.use(gameController)
}