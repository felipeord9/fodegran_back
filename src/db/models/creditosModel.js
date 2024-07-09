const { Model, DataTypes, Sequelize } = require("sequelize");

const CREDITOS_TABLE = 'creditos'

const CreditosSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  rowId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'row_id'
  },
  nombre:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoCredito:{
    type:DataTypes.STRING,
    allowNull:true,
    field:'tipo_credito'
  },
  cantidad:{
    type: DataTypes.BIGINT,
    allowNull: false
  },
  plazo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "fecha_creacion",
  },
}

class Creditos extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CREDITOS_TABLE,
      modelName: 'Creditos',
      timestamps: false
    }
  }
}

module.exports = {
  CREDITOS_TABLE,
  CreditosSchema,
  Creditos
}