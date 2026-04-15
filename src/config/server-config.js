const dotenv = require('dotenv');

dotenv.config();


module.exports = {
    PORT: process.env.PORT,
    BASE_URL: process.env.NODE_ENV !== 'production' ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL,
}