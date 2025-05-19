const { Model, DataTypes, Sequelize } = require("sequelize");
const { CREDITOS_TABLE } = require('./creditosModel')

const ESTUDIO_CREDITO_TABLE = 'estudioCredito'

const EstudioCreditoSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  FechaIngreso:{
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_ingreso'
  },
  salarioBasico:{
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'salario_basico'
  },
  cesantias:{
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  primas:{
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  vacaciones: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  libranza:{
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  otrosDescuentos:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'otros_descuentos'
  },
  banco:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroCuenta:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'numero_cuenta'
  },
  totalDescuentoEmpresa:{
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'total_descuento_empresa'
  },
  aporteTotalObligatorio:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'aporte_total_obligatorio'
  },
  saldoAhorro:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'saldo_ahorro'
  },
  tasa:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  poseeCredito:{
    type: DataTypes.STRING,
    allowNull: true,
    field: 'posee_credito'
  },
  saldoFecha:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'saldo_ala_fecha'
  },
  cuotaMensual:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'cuota_mensual'
  },
  totalAportesMensuales:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'total_aportes_mensuales'
  },
  aporteVoluntario:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'aporte_voluntario'
  },
  otrosFondo:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'otros_fondo'
  },
  totalDescuentoFondo:{
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'total_descuento_fondo'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "fecha_creacion",
  },
  creditoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'credito_id',
    references: {
      model: CREDITOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}

class EstudioCredito extends Model {
  static associate(models) {
    this.belongsTo(models.Creditos, { as: 'credito'})
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTUDIO_CREDITO_TABLE,
      modelName: 'EstudioCredito',
      timestamps: false
    }
  }
}

module.exports = {
  ESTUDIO_CREDITO_TABLE,
  EstudioCreditoSchema,
  EstudioCredito
}