const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.model')
const CustomError = require('../utils/error.util')
const { hashMethod } = require('../utils/hash.util')
const { generateToken } = require('../utils/jwt.util')


exports.registerUser = async ({ username, password }) => {
    try {
        const salt = uuidv4(); // Generate salt
        const hashed = hashMethod(password + salt) // Generate hash of username and salt
        await User.create({ username, salt, password: hashed })
        return { message: 'Registration is successful' }
    } catch (error) {
        if (error.code === 11000) { // Duplicate error
            throw new CustomError(400, 'User already exists')
        }
        throw error
    }
}

exports.loginUser = async ({ username, password }) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new CustomError(404, 'Username is not registered with us')
    }

    // First check password is correct or not
    const hashed = hashMethod(password + user.salt)
    if (hashed !== user.password) {
        throw new CustomError(400, 'Password is wrong!')
    }

    // generate token
    const token = generateToken({ username })
    return { token }
}