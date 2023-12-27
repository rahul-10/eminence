const express = require('express')
const router = express.Router()

const { handleError } = require('../middlewares/error.middleware')
const UserController = require('../controllers/user.controller')

router.post('/register', UserController.registerUser, handleError)
router.post('/login', UserController.loginUser, handleError)

module.exports = router