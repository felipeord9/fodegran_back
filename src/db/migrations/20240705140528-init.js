'use strict';
const { USER_TABLE, UserSchema } = require('../models/userModel')
const { CREDITOS_TABLE, CreditosSchema } = require('../models/creditosModel')
const { ODONTOLOGIA_TABLE, OdontologiaSchema } = require('../models/odontologia')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CREDITOS_TABLE,CreditosSchema);
    await queryInterface.createTable(ODONTOLOGIA_TABLE,OdontologiaSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CREDITOS_TABLE);
    await queryInterface.dropTable(ODONTOLOGIA_TABLE);

  }
};
