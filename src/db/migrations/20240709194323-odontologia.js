'use strict';
const { ODONTOLOGIA_TABLE, OdontologiaSchema } = require('../models/odontologia')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ODONTOLOGIA_TABLE,OdontologiaSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ODONTOLOGIA_TABLE);

  }
};

