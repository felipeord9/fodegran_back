const express = require('express')
const passport = require('passport')
const FuncionarioController = require('../../controllers/FuncionarioController')

const router = express.Router()

router
  .get('/', FuncionarioController.findAllFuncionarios)
  .get('/:id', FuncionarioController.findOneFuncionario)
  .get('/cedula/:cedula', FuncionarioController.findFuncionarioByCedula)
  .post('/', FuncionarioController.createFuncionario)
  .patch('/:id', FuncionarioController.updateFuncionario)

module.exports = router