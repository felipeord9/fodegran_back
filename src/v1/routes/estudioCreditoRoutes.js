const express = require('express')
const EstudioCreditoController = require('../../controllers/estudioCreditoController')
const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false })
)

router
  .get('/', EstudioCreditoController.findAllEstudioCreditos)
  .get('/:id', EstudioCreditoController.findOneEstudioCredito)
  .get('/with/:id', EstudioCreditoController.findEstudioWithCredito)
  .get('/credito/:token', EstudioCreditoController.verifyToken)
  .get('/find/credito/:credito', EstudioCreditoController.findOneByCredito)
  .get('/paquete/credito/:token', EstudioCreditoController.duoVerify)

  .post('/', EstudioCreditoController.createEstudioCredito)
  
  .post("/mail/auxiliar",EstudioCreditoController.mailAuxiliar)
  .post("/mail/comite",EstudioCreditoController.mailComite)
  .post("/second/mail/comite",EstudioCreditoController.secondMailComite)
  
  .patch('/:id', EstudioCreditoController.updateEstudioCredito)
  
  .delete('/:id', checkRoles("admin"), EstudioCreditoController.deleteEstudioCredito)

module.exports = router