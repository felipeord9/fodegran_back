'use strict';
const { USER_TABLE, UserSchema } = require('../models/userModel')
const { CREDITOS_TABLE, CreditosSchema } = require('../models/creditosModel')
const { ODONTOLOGIA_TABLE, OdontologiaSchema } = require('../models/odontologia')
const { ESTUDIO_CREDITO_TABLE, EstudioCreditoSchema } = require('../models/estudioCreditoModel')
const { AGENCY_TABLE, AgencySchema } = require("../models/agencyModel");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CREDITOS_TABLE,CreditosSchema);
    await queryInterface.createTable(ODONTOLOGIA_TABLE,OdontologiaSchema);
    await queryInterface.createTable(ESTUDIO_CREDITO_TABLE,EstudioCreditoSchema);
    await queryInterface.createTable(AGENCY_TABLE, AgencySchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CREDITOS_TABLE);
    await queryInterface.dropTable(ODONTOLOGIA_TABLE);
    await queryInterface.dropTable(ESTUDIO_CREDITO_TABLE);
    await queryInterface.dropTable(AGENCY_TABLE);
  }
};
