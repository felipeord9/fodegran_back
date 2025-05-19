const express = require('express')
const OdontologiaController = require('../../controllers/odontologiaController')
const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false })
)

router
  .get('/', OdontologiaController.findAllOdontologia)
  .get('/:id', OdontologiaController.findOneOdontologia)
  .get("/cedula/:id", OdontologiaController.findOneByCedula)
  .post('/', OdontologiaController.createOdontologia)
  .patch('/:id', OdontologiaController.updateOdontologia)
  .delete('/:id', checkRoles("admin"), OdontologiaController.deleteOdontologia)

module.exports = router