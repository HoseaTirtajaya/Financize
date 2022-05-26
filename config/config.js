require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "test": {
    "username": process.env.DB_TEST_USERNAME,
    "password": process.env.DB_TEST_PASSWORD,
    "database": process.env.DB_TEST_DATABASE,
    "host": process.env.DB_TEST_HOST,
    "dialect": process.env.DB_TEST_DIALECT,
    "maxConcurrentQueries": 100,
    "port": 5432,
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    "pool": { maxConnections: 5, maxIdleTime: 30},
    'language': 'en',
    "logging": false
  },
  "production": {
    "username": process.env.DB_PROD_USERNAME,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_DATABASE,
    "host": process.env.DB_PROD_HOST,
    "dialect": process.env.DB_PROD_DIALECT,
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    "logging": false
  }
}
