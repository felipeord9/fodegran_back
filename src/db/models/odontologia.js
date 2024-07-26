const { Model, DataTypes, Sequelize } = require("sequelize");

const ODONTOLOGIA_TABLE = 'odontologia'

const OdontologiaSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  idCotizante: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'id_cotizante'
  },
  nameCotizante:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name_cotizante'
  },
  correoCotizante:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'correo_cotizante'
  },
  numeroCotizante:{
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'numero_cotizante'
  },
  idBene1:{
    type:DataTypes.BIGINT,
    allowNull:false,
    field:'id_benenficiario_1'
  },
  nameBene1:{
    type: DataTypes.STRING,
    allowNull: false,
    field:'name_benenficiario_1'
  },
  fechaBene1:{
    type: DataTypes.DATE,
    allowNull: false,
    field:'fecha_benenficiario_1'
  },
  parenBene1:{
    type: DataTypes.STRING,
    allowNull: false,
    field:'paren_benenficiario_1'
  },
  idBene2:{
    type:DataTypes.STRING,
    allowNull:true,
    field:'id_benenficiario_2'
  },
  nameBene2:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'name_benenficiario_2'
  },
  fechaBene2:{
    type: DataTypes.DATE,
    allowNull: true,
    field:'fecha_benenficiario_2'
  },
  parenBene2:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'paren_benenficiario_2'
  },
  idBene3:{
    type:DataTypes.STRING,
    allowNull:true,
    field:'id_benenficiario_3'
  },
  nameBene3:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'name_benenficiario_3'
  },
  fechaBene3:{
    type: DataTypes.DATE,
    allowNull: true,
    field:'fecha_benenficiario_3'
  },
  parenBene3:{
    type: DataTypes.STRING,
    allowNull: true,
    field:'paren_benenficiario_3'
  },
  estado:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  cortesia:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "fecha_creacion",
  },
}

class Odontologia extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ODONTOLOGIA_TABLE,
      modelName: 'Odontologia',
      timestamps: false
    }
  }
}

module.exports = {
  ODONTOLOGIA_TABLE,
  OdontologiaSchema,
  Odontologia
}