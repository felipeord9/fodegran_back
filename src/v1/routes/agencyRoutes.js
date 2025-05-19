const express = require('express')
const AgencyController = require('../../controllers/agencyController')

const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

/* router.use(
    passport.authenticate('jwt', { session: false }), 
) */

router
    .get('/', AgencyController.findAllAgencies)
    .get("/:id", AgencyController.findOneAgency)

module.exports = router