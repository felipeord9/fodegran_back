const express = require('express')
const passport = require('passport')
const FuncionarioController = require('../../controllers/FuncionarioController')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false })
)

router
  .get('/', FuncionarioController.findAllFuncionarios)
  .get('/:id', FuncionarioController.findOneFuncionario)
  .get('/cedula/:cedula', FuncionarioController.findFuncionarioByCedula)
  .post('/', FuncionarioController.createFuncionario)
  .patch('/:id', FuncionarioController.updateFuncionario)

module.exports = router