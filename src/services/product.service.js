const axios = require('axios');

const { DUMMY_PRODUCTS_API } = process.env


exports.getProducts = async ({ category }) => {
    try {
        // Fetch products from external service
        const result = await axios.get(DUMMY_PRODUCTS_API)

        // filter out products for provided category. If category not provided return all products
        const products = result.data.products.map((product) => {
            if (!category) {
                return { title: product.title, description: product.description, thumbnail: product.thumbnail }
            } else if (product.category === category) {
                return { title: product.title, description: product.description, thumbnail: product.thumbnail }
            }
        }).filter(obj => obj)

        return { total: products.length, products }

    } catch (err) {
        throw (err)
    }
}

