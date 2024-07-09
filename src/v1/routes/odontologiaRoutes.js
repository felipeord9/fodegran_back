const express = require('express')
const OdontologiaController = require('../../controllers/odontologiaController')

const router = express.Router()

router
  .get('/', OdontologiaController.findAllOdontologia)
  .get('/:id', OdontologiaController.findOneOdontologia)
  .get("/cedula/:id", OdontologiaController.findOneByCedula)
  .post('/', OdontologiaController.createOdontologia)
  .patch('/:id', OdontologiaController.updateOdontologia)
  .delete('/:id',OdontologiaController.deleteOdontologia)

module.exports = router