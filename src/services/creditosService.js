const { models } = require("../libs/sequelize");

const find = async () => {
    const creditos = await models.Creditos.findAll()
    return creditos
}

const findOne = async (id) => {
    const credito = await models.Creditos.findByPk(id)
    if (!credito) throw boom.notFound("Credito not found");
    return credito
}

const findByCedula = async (cedula) => {
    const credito = await models.Creditos.findOne({
        where:{
            rowId: cedula
        }
    })
    if (!credito) throw boom.notFound("Credito not found");
    return credito
}

const create = async (body) => {
    console.log(body)
    const client = await models.Creditos.create(body);
  
    return client;
};

const update = async (id, changes) => {
    const Credito = await findOne(id)
    const updatedCredito = await Credito.update(changes)
  
    return updatedCredito
}
const remove = async(id)=>{
    const del = models.Creditos.sequelize.query(`DELETE FROM creditos WHERE id = ${id} `, [id])
    return del
}

module.exports = {
    find,
    findOne,
    findByCedula,
    create,
    update,
    remove,
  };