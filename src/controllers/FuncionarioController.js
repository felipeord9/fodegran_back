const FuncionarioService = require('../services/funcionarioService');
const { config } = require("../config/config");

const findAllFuncionarios = async (req, res, next) => {
    try {
      const data = await FuncionarioService.find();
      
      /* console.log(data) */
      res.status(200).json({
        message: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
};

const findOneFuncionario = async (req, res, next) => {
    try {
      const { params:{id}} = req
      const data = await FuncionarioService.findOne(id)
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
}

const findFuncionarioByCedula = async (req, res, next) => {
    try{
        const { params: { cedula } } = req;
        const data=await FuncionarioService.findByCedula(cedula)
    
        res.status(200).json({
          message:'OK',
          data
        })
      } catch(error){
        console.log(error)
        next(error)
      }
}

const createFuncionario = async (req, res, next) => {
    try {
      const {body} = req
      /* console.log(body) */

      const data = await FuncionarioService.create({
        rowId:body.cedula,
        nombre:body.nombre,
        correo:body.correo,
        tipoCredito: body.TipoCredito,
        cantidad: body.cantidad,
        plazo: body.plazo,
        estado: body.estado,
        createdAt: body.createdAt
      })
  
      res.status(201).json({
        message: 'Created',
        data
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
}

const updateFuncionario =async (req, res, next) => {
    try {
      const { body, params: { id } } = req
      const data = await FuncionarioService.update(id, body)
  
      res.status(200).json({
        message: 'Updated',
        data
      })
    } catch (error) {
      next(error)
    }
}

const deleteFuncionario = async(req,res,next)=>{
  try{
      const {params:{id}}=req
      /* console.log(id) */
      const data = await FuncionarioService.remove(id)
      res.status(200).json({
          message:'Deleted',
          data
      })
  } catch(error){
    console.log(error)
      next(error)
  }
}

module.exports = {
    findAllFuncionarios,
    findOneFuncionario,
    findFuncionarioByCedula,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
}