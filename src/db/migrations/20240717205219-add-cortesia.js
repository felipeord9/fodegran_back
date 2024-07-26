'use strict';
const { ODONTOLOGIA_TABLE, OdontologiaSchema } = require('../models/odontologia')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(ODONTOLOGIA_TABLE,'cortesia',{
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /* await queryInterface.dropTable(ODONTOLOGIA_TABLE); */
  }
};

