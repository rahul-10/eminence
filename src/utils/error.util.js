function CustomError(status, message) {
    const error = new Error(message);

    error.name = 'CustomError';

    error.status = status || 500;

    Error.captureStackTrace(error, CustomError);

    return error;
}

module.exports = CustomError;