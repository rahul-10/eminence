const ProductService = require('../services/product.service')

exports.getProducts = async (req, res, next) => {
    try {
        const { category } = req.query;
        const result = await ProductService.getProducts({ category })
        res.status(200).json({ data: result })
    } catch (err) {
        next(err)
    }
}