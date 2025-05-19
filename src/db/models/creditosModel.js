const { Model, DataTypes, Sequelize } = require("sequelize");

const CREDITOS_TABLE = 'creditos'

const CreditosSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  valorSolicitado:{
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'valor_solicitado'
  },
  plazo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  modalidad:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinoCredito:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'destino_credito'
  },
  tipoSolicitante:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'tipo_solicitante'
  },
  descipDestino:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'descripcion_destino'
  },
  fechaAfiliacion:{
    type: DataTypes.DATE,
    allowNull: true,
    field: "fecha_afiliacion",
  },
  rowId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'row_id'
  },
  lugarExpedicion:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'lugar_expedicion'
  },
  nombre:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoCivil:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'destino_civil'
  },
  sexo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaNacimiento:{
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_nacimiento'
  },
  lugarNacimiento:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'lugar_nacimiento'
  },
  personasAcargo:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'personas_acargo'
  },
  direccionResidencia:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'direccion_residencia'
  },
  ciudadResidencia:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ciudad_residencia'
  },
  celularResidencia:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'celular_residencia'
  },
  nombreAgencia:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_agencia'
  },
  ciudadAgencia:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ciudad_agencia'
  },
  cuentaBancaria:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cuenta_bancaria'
  },
  tipoCuenta:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'tipo_cuenta'
  },
  entidadBancaria:{
    type: DataTypes.STRING,
    allowNull: false,
    field: 'entidad_bancaria'
  },
  estado:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  motivo:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "fecha_creacion",
  },
  fechaAprobacion:{
    type: DataTypes.DATE,
    allowNull: true,
    field: "fecha_aprobacion",
  },
  fechaDesembolso:{
    type: DataTypes.DATE,
    allowNull: true,
    field: "fecha_desembolso",
  },
  firmaAsociado:{
    type: DataTypes.TEXT,
    allowNull:true,
    field: "firma_asociado",
  },
  fotoAsociado:{
    type: DataTypes.TEXT,
    allowNull:true,
    field: "firma_asociado",
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