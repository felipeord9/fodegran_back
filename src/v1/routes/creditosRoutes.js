const express = require('express')
const CreditoController = require('../../controllers/creditosController')

const router = express.Router()

router
  .get('/', CreditoController.findAllCreditos)
  .get('/:id', CreditoController.findOneCredito)
  .post('/', CreditoController.createCredito)
  .post("/mail/auxiliar",CreditoController.mailAuxiliar)
  .patch('/:id', CreditoController.updateCredito)
  .delete('/:id',CreditoController.deleteCredito)

module.exports = router