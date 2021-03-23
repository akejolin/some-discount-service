module.exports = (sequelize, Sequelize) =>
  sequelize.define("codes", {
    name: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    isUsed: {
      type: Sequelize.BOOLEAN
    },
  })