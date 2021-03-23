/**
* @desc Init DB model of user.
* @return void
*/


const bcrypt = require("bcryptjs")
const db = require("../../models")

const Users = db.users;
const Roles = db.roles;

module.exports = () => {
  // Create User Roles
  Roles.create({
    id: 1,
    name: "user"
  })
  Roles.create({
    id: 2,
    name: "moderator"
  })

  Roles.create({
    id: 3,
    name: "admin"
  })

  // Create Dev Users
  Users.create({
    id: 1,
    username: 'testy-admin',
    email: 'testy-admin@test.com',
    password: bcrypt.hashSync('11111', 8)
  }).then(user => {
      Roles.findAll({
        where: { name: 'admin' }
      }).then(roles => {
        user.setRoles(roles)
      })
  })
  Users.create({
    id: 2,
    username: 'testy-moderator',
    email: 'testy-moderator@test.com',
    password: bcrypt.hashSync('11111', 8)
  }).then(user => {
      Roles.findAll({
        where: { name: 'moderator' }
      }).then(roles => {
        user.setRoles(roles)
      })
  })
  Users.create({
    id: 3,
    username: 'testy-user',
    email: 'testy-userl@test.com',
    password: bcrypt.hashSync('11111', 8)
  }).then(user => {
      Roles.findAll({
        where: { name: 'user' }
      }).then(roles => {
        user.setRoles(roles)
      })
  })
}