const { models } = require("../libs/sequelize");

const find = async () => {
    const registros = await models.Odontologia.findAll()
    return registros
}

const findOne = async (id) => {
    const registro = await models.Odontologia.findByPk(id)
    if (!registro) throw boom.notFound("Odontologia not found");
    return registro
}

const findCedula = async (cedula) => {
    const registro = await models.Odontologia.findOne({
        where:{
            idCotizante: cedula
        }
    })
    if (!registro) throw boom.notFound("Odontologia not found");
    return registro
}

const create = async (body) => {
    console.log(body)
    const registro = await models.Odontologia.create(body);
  
    return registro;
};

const update = async (id, changes) => {
    const registro = await findOne(id)
    const updatedRegistro = await registro.update(changes)
  
    return updatedRegistro
}
const remove = async(id)=>{
    const del = models.Creditos.sequelize.query(`DELETE FROM odontologia WHERE id = ${id} `, [id])
    return del
}

module.exports = {
    find,
    findOne,
    findCedula,
    create,
    update,
    remove,
  };