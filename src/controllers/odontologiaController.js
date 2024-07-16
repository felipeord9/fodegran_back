const OdontologiaService = require('../services/odontologiaService');
const { config } = require("../config/config");
const nodemailer = require("nodemailer")

const findAllOdontologia = async (req, res, next) => {
    try {
      const data = await OdontologiaService.find();
      
      /* console.log(data) */
      res.status(200).json({
        message: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
};

const findOneOdontologia = async (req, res, next) => {
    try {
      const { params:{id}} = req
      const data = await OdontologiaService.findOne(id)
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
}

const findOneByCedula = async (req, res, next) => {
  try {
    
    const { params: { id } } = req;
    const data = await OdontologiaService.findCedula(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
}

const createOdontologia = async (req, res, next) => {
    try {
      const {body} = req
      /* console.log(body) */

      const data = await OdontologiaService.create({
        idCotizante:body.cotizante.cedula,
        nameCotizante:body.cotizante.nombre,
        correoCotizante:body.cotizante.correo,
        numeroCotizante:body.cotizante.numero,
        idBene1:body.datos.IdBene1,
        nameBene1:body.datos.DescBene1,
        fechaBene1:body.datos.fechaBene1,
        parenBene1:body.datos.parenBene1,
        idBene2:body.datos.IdBene2,
        nameBene2:body.datos.DescBene2,
        fechaBene2:body.datos.fechaBene2,
        parenBene2:body.datos.parenBene2,
        idBene3:body.datos.IdBene3,
        nameBene3:body.datos.DescBene3,
        fechaBene3:body.datos.fechaBene3,
        parenBene3:body.datos.parenBene3,
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

const updateOdontologia =async (req, res, next) => {
    try {
      const { body, params: { id } } = req
      console.log(id)
      const data = await OdontologiaService.update(id, body)
  
      res.status(200).json({
        message: 'Updated',
        data
      })
    } catch (error) {
      next(error)
      console.log(error)
    }
}

const deleteOdontologia = async(req,res,next)=>{
  try{
      const {params:{id}}=req
      /* console.log(id) */
      const data = await OdontologiaService.remove(id)
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
    findAllOdontologia,
    findOneOdontologia,
    findOneByCedula,
    createOdontologia,
    updateOdontologia,
    deleteOdontologia,
}