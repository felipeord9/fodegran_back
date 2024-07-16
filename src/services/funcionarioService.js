const { models } = require("../libs/sequelize");

const find = async () => {
    const creditos = await models.Funcionarios.findAll()
    return creditos
}

const findOne = async () => {
    const Funcionario = await models.Funcionarios.findByPk(id)
    if (!Funcionario) throw boom.notFound("Funcionario not found");
    return Funcionario
}

const findByCedula = async (cedula) => {
    const funcionario = await models.Funcionarios.findOne({
        where: {
            cedula:cedula
        }
     })
     
    if(!funcionario) throw boom.notFound('funcionario no encontrado')
     
    return funcionario
}

const create = async (body) => {
    console.log(body)
    const Funcionario = await models.Funcionarios.create(body);
  
    return Funcionario;
};

const update = async (id, changes) => {
    const Funcionario = await findOne(id)
    const updatedFuncionario = await Funcionario.update(changes)
  
    return updatedFuncionario
}
const remove = async(id)=>{
    const del = models.Funcionarios.sequelize.query(`DELETE FROM creditos WHERE id = ${id} `, [id])
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