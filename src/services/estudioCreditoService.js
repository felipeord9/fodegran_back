const { models } = require("../libs/sequelize");

const find = async () => {
    const estudios = await models.EstudioCredito.findAll({
        include:[
            "credito"
        ]
    })
    return estudios
}

const findOne = async (id) => {
    const estudioCredito = await models.EstudioCredito.findOne({
        where:{
            id
        },
        include:[
            "credito"
        ]
    })
    if (!estudioCredito) throw boom.notFound("estudio Credito not found");
    return estudioCredito
}

const findEstudioWithCredito = async (id) => {
    const estudioCredito = await models.EstudioCredito.findOne({
        where:{
            creditoId:id
        },
        include:[
            "credito"
        ]
    })
    if (!estudioCredito) throw boom.notFound("estudio Credito not found");
    return estudioCredito
}

const findByCredito = async (credito) => {
    const estudioCredito = await models.EstudioCredito.findOne({
        where:{
            creditoId: credito
        },
        include:[
            "credito"
        ]
    })
    if (!estudioCredito) throw boom.notFound("estudio Credito not found");
    return estudioCredito
}

const create = async (body) => {
    const client = await models.EstudioCredito.create(body);
  
    return client;
};

const update = async (id, changes) => {
    const estudioCredito = await findOne(id)
    const updatedCredito = await estudioCredito.update(changes)
  
    return updatedCredito
}
const remove = async(id)=>{
    const del = models.estudioCredito.sequelize.query(`DELETE FROM creditos WHERE id = ${id} `, [id])
    return del
}

module.exports = {
    find,
    findOne,
    findEstudioWithCredito,
    findByCredito,
    create,
    update,
    remove,
  };