const UserService = require('../services/user.service')
const CustomError = require('../utils/error.util')

exports.registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new CustomError(400, 'username or password is missing')
        }
        // Password length and certain type of character constraint can also be applied

        const result = await UserService.registerUser({ username, password })
        res.status(200).json({ data: result })
    } catch (err) {
        next(err)
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new CustomError(400, 'username or password is missing')
        }
        const result = await UserService.loginUser({ username, password })
        res.status(200).json({ data: result })
    } catch (err) {
        next(err)
    }
}