const router = require('express').Router()
const { isUser, isGuest } = require('../middleware/guards')
const { register, login } = require('../services/user')
const { mapErrors } = require('../util/mappers')


router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })

    console.log(req.password);

})

router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required');
        } else if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        } else if (req.body.password.length < 4) {
            throw new Error('The password should be at least four characters long.');
        }

        const user = await register(req.body.username, req.body.email, req.body.password)
        req.session.user = user;;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)

        const data = {
            username: req.body.username,
            email: req.body.email,
        };

        res.render('register', { title: 'Register Page', data, errors });
    }

})


router.get('/login', isGuest(), (req, res) => {
    res.render('login')
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password)
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('login', { data: { username: req.body.username }, errors })
    }
})


router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
})



module.exports = router;