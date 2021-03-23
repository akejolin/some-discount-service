module.exports = (sequelize, Sequelize) =>
  sequelize.define("brand", {
    name: {
      type: Sequelize.STRING
    },
  })