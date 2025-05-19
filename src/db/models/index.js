const { User, UserSchema } = require('./userModel')
const { Creditos, CreditosSchema } = require('./creditosModel')
const { Odontologia, OdontologiaSchema } = require('./odontologia')
const { EstudioCredito, EstudioCreditoSchema } = require('./estudioCreditoModel')
const { Agency, AgencySchema } = require('./agencyModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Creditos.init(CreditosSchema, Creditos.config(sequelize))
  Odontologia.init(OdontologiaSchema, Odontologia.config(sequelize))
  EstudioCredito.init(EstudioCreditoSchema, EstudioCredito.config(sequelize))
  Agency.init(AgencySchema, Agency.config(sequelize))


  User.associate(sequelize.models)
  Creditos.associate(sequelize.models)
  Odontologia.associate(sequelize.models)
  EstudioCredito.associate(sequelize.models)
  Agency.associate(sequelize.models)
}

module.exports = setupModels