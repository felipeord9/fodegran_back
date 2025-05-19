'use strict';
const { CREDITOS_TABLE, CreditosSchema } = require('../models/creditosModel')
const { ESTUDIO_CREDITO_TABLE, EstudioCreditoSchema } = require('../models/estudioCreditoModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CREDITOS_TABLE,CreditosSchema);
    await queryInterface.createTable(ESTUDIO_CREDITO_TABLE,EstudioCreditoSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CREDITOS_TABLE);
    await queryInterface.dropTable(ESTUDIO_CREDITO_TABLE);

  }
};
