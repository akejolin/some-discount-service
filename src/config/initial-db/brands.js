/**
* @desc Init data to DB model of brands.
* @return void
*/

const bcrypt = require("bcryptjs")
const db = require("../../models")

const Brands = db.brands;

module.exports = () => {

  // Create
  Brands.create({
    id: 1,
    name: 'blocket',
  })

}