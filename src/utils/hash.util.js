const crypto = require('crypto');

exports.hashMethod = (input) => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}
