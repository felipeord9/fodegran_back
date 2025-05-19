const { models } = require('../libs/sequelize')

const find = () => {
  const agencies = models.Agency.findAll()
  return agencies
}

const findOne = async (id) => {
  const agency = await models.Agency.findByPk(id)

  if(!agency) throw boom.notFound('agency no encontrado')

  return agency
}

module.exports = {
  find,
  findOne,
}