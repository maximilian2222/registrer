const Router  = require('express')
const router = new Router()
const controller = require('./authController')
const {body, check} = require('express-validator')
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')


router.post('/registration' ,
    check('password', 'довжина').notEmpty(),
    check('password', 'довжина').isLength({min:5, max:10}),
    controller.registration)
router.post('/login', controller.login)
router.get('/users',roleMiddleware(['USER']), controller.getUsers)


module.exports = router


