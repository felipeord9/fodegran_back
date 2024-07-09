const { User, UserSchema } = require('./userModel')
const { Creditos, CreditosSchema } = require('./creditosModel')
const { Odontologia, OdontologiaSchema } = require('./odontologia')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Creditos.init(CreditosSchema, Creditos.config(sequelize))
  Odontologia.init(OdontologiaSchema, Odontologia.config(sequelize))


  User.associate(sequelize.models)
  Creditos.associate(sequelize.models)
  Odontologia.associate(sequelize.models)

}

module.exports = setupModels