const express = require('express')
const CreditoController = require('../../controllers/creditosController')
const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

/* router.use(
  passport.authenticate('jwt', { session: false })
) */

router
  .get('/', CreditoController.findAllCreditos)
  .get('/:id', CreditoController.findOneCredito)
  .get('/solicitud/token/:token', CreditoController.verifyToken)
  .get('/solicitud/:token', CreditoController.verifyTokenWithId)

  .post('/', CreditoController.createCredito)
  
  .post("/mail/solicitante",CreditoController.mailSolicitante)
  .post("/mail/estudio/credito",CreditoController.mailEstudioCredito)
  .post("/mail/presidente",CreditoController.mailPresidente)
  .post("/mail/gerencia",CreditoController.mailGerencia)
  .post("/mail/tesoreria",CreditoController.mailTesoreria)
  .post("/mail/finalizado",CreditoController.mailFinalizado)

  .post("/mail/reject/comite",CreditoController.mailRejectComite)
  .post("/mail/reject/gerencia",CreditoController.mailRejectGerencia)

  .patch('/:id', CreditoController.updateCredito)
  .patch('/add/signature/:token', CreditoController.addSignature)
  
  .delete('/:id', checkRoles("admin"), CreditoController.deleteCredito)

module.exports = router