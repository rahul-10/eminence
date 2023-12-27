const jwt = require('jsonwebtoken');

const TOKEN_EXPIRATION = 30 * 60 // 30 minutes

// Store it secretly, for simplicity, I am keeping directly in code.
const SECRET_KEY = "cc3deEad349a09asd416DFG8555DD32a5439fe6f8"

exports.generateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION })

exports.verifyToken = (token) => jwt.verify(token, SECRET_KEY);

