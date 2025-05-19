const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const CreditosRoutes = require('./creditosRoutes')
const OdontologiaRoutes = require('./odontologiaRoutes')
const FuncionarioRoutes = require('./funcionarioRoutes')
const EstudioCreditoRoutes = require('./estudioCreditoRoutes')
const UploadFilesRoutes = require('./uploadFilesRoutes')
const AgencyRoutes = require('./agencyRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/creditos', CreditosRoutes)
    router.use('/odontologia', OdontologiaRoutes)
    router.use('/funcionarios',FuncionarioRoutes)
    router.use('/estudio',EstudioCreditoRoutes)
    router.use('/upload', UploadFilesRoutes)
    router.use('/agencies', AgencyRoutes)

}

module.exports = routerApi