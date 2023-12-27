const express = require('express')
const router = express.Router()

const { handleError } = require('../middlewares/error.middleware')
const { authorization } = require('../middlewares/authentication.middleware')
const ProductController = require('../controllers/product.controller')

router.get('/', authorization, ProductController.getProducts, handleError)

module.exports = router