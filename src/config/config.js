require('dotenv').config()

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUrl: process.env.DB_URL,
    creditoUrl: process.env.CREDITO_URL,
    estudioCreditoUrl: process.env.ESTUDIO_CREDITO_URL,
    estudioCreditoAuxiliarUrl: process.env.ESTUDIO_CREDITO_AUXILIAR_URL,
    paqueteCreditoUrl: process.env.PAQUETE_CREDITO_URL,
    paqueteTesoreriaUrl: process.env.PAQUETE_TESORERIA_URL,
    recoveryUrl: process.env.RECOVERY_URL,
    requestUrl: process.env.REQUEST_URL,
    isProd: false,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpEmail: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = { config }