const { verifyToken } = require('../utils/jwt.util')

exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({
      status: 400,
      data: 'Authorization token is missing'
    })
  }
  try {
    const token = authorization.slice(7);
    verifyToken(token)
    next();
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      data: err.message || 'something went wrong'
    })
  }
};
