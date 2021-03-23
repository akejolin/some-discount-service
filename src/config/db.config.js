/**
* @desc Configuration to setup mysql DB
* @return object - db configs
*/

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.DB_PWD || 'sommarblomma', // this would of course not be set here in a true service due to security issues 
  DB: "some-discount-service",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}