require('ts-node/register');
const config = require('./src/config/database');
console.log(config.default);


module.exports = config.default;