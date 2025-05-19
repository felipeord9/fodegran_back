const EstudioCreditoService = require('../services/estudioCreditoService');
const CreditoService = require('../services/creditosService');
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

const findAllEstudioCreditos = async (req, res, next) => {
    try {
      const data = await EstudioCreditoService.find();
      
      res.status(200).json({
        message: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
};

const findOneEstudioCredito = async (req, res, next) => {
    try {
      const { params:{ id }} = req
      const data = await EstudioCreditoService.findOne(id)
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
}

const findEstudioWithCredito = async (req, res, next) => {
  try {
    const { params:{ id }} = req
    const data = await EstudioCreditoService.findEstudioWithCredito(id)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneByCredito = async (req, res, next) => {
  try {
    const { params:{ credito }} = req
    const data = await EstudioCreditoService.findByCredito(credito)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const createEstudioCredito = async (req, res, next) => {
    try {
      const {body} = req

      const data = await EstudioCreditoService.create(body)
  
      res.status(201).json({
        message: 'Created',
        data
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
}

const updateEstudioCredito =async (req, res, next) => {
    try {
      const { body, params: { id } } = req

      const estudio = {
        aporteTotalObligatorio: body.aporteTotalObligatorio,
        saldoAhorro: body.saldoAhorro,
        poseeCredito: body.poseeCredito,
        tasa: body.tasa,
        saldoFecha: body.saldoFecha,
        cuotaMensual: body.cuotaMensual,
        totalAportesMensuales: body.totalAportesMensuales,
        aporteVoluntario: body.aporteVoluntario,
        otrosFondo: body.otrosFondo,
        totalDescuentoFondo: body.totalDescuentoFondo
      }

      const data = await EstudioCreditoService.update(id, estudio)

      const changeCredito = {
        estado: body.estado
      }

      const credito = await CreditoService.update(body.idCredito, changeCredito)

      res.status(200).json({
        message: 'Updated',
        data,
        credito
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
}

const deleteEstudioCredito = async(req,res,next)=>{
  try{
      const {params:{id}}=req
      /* console.log(id) */
      const data = await EstudioCreditoService.remove(id)
      res.status(200).json({
          message:'Deleted',
          data
      })
  } catch(error){
    console.log(error)
      next(error)
  }
}

const mailAuxiliar = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret)

    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
          port: config.smtpPort,
          secure: true,
          auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
          }
      });
      const mensaje={
          from: config.smtpEmail,
          to: 'sistemas2@granlangostino.net',
          subject: "¡NUEVA SOLICITUD DE CREDITO!",
          html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap"
                rel="stylesheet"
              />
              <title>SOLICITUD DE CREDITO</title>
              <style>
                body {
                  font-family: Arial, sans-serif;;
                  line-height: 1.5;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
          
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
          
                .header {
                  background-color: #0101b5;
                  padding: 5px;
                  text-align: center;
                }
          
                .header h1 {
                  color: #fff;
                  font-size: medium;
                  margin: 0;
                }
          
                .invoice-details {
                  margin-top: 20px;
                }
          
                .invoice-details p {
                  margin: 0;
                }
          
                .logo {
                  text-align: right;
                }
          
                .logo img {
                  max-width: 200px;
                }
          
                .invoice-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
          
                .invoice-table th,
                .invoice-table td {
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: center;
                }
          
                .invoice-table th {
                  background-color: #f1f1f1;
                }
          
                .warning {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .warning p {
                  margin: 0;
                }
          
                .att {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .att p {
                  margin: 0;
                }
          
                .att a {
                  text-decoration: none;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>¡SE HA LLENADO LA PRIMERA PARTE DEL ESTUDIO DEL CRÉDITO!</h1>
                </div>

                <p>Antes de realizar cualquier acción, verifica la información sumistrada.</p>

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.estudioCreditoAuxiliarUrl}/${token}</b>                  
                </div>
                <div class="att">
                  <p>Cordialmente,</p>
                  <p>
                    FODEGRAN<br>
                    Línea de atención +57 324 2559322 <br>
                    email asistentefodegran@gmail.com <br>
                    Calle 13 #32-417 Bodega 4 Acopi - Yumbo, Valle <br> 
                  </p>
                </div>
          
                <div class="footer">
                  <p><u>Aviso Legal</u></p>
                  <p>
                    SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
                    DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
                    SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
                    AGRADECEMOS NOS INFORME AL RESPECTO. El contenido de este mensaje de
                    correo electrónico y todos los archivos adjuntos a éste contienen
                    información de carácter confidencial y/o uso privativo de FODEGRAN
                    y de sus destinatarios. Si usted recibió este mensaje
                    por error, por favor elimínelo y comuníquese con el remitente para
                    informarle de este hecho, absteniéndose de divulgar o hacer cualquier
                    copia de la información ahí contenida, gracias. En caso contrario
                    podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
                  </p>
                </div>
              </div>
            </body>
          </html>
          
          `}
          transporter.sendMail(mensaje,(error,info)=> {
            if(error){
              res.json({
                error,
              });
            } else {
              res.json({
                info,
              });
              console.log('Correo enviado a:'+info.response)
            }
          })     
    res.status(200)
    } catch (error) {
    console.log(error);
    next(error)
  }
};

const mailComite = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret)

    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
          port: config.smtpPort,
          secure: true,
          auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
          }
      });
      const mensaje={
          from: config.smtpEmail,
          to: 'sistemas2@granlangostino.net',
          subject: "¡NUEVA SOLICITUD DE CREDITO!",
          html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap"
                rel="stylesheet"
              />
              <title>SOLICITUD DE CREDITO</title>
              <style>
                body {
                  font-family: Arial, sans-serif;;
                  line-height: 1.5;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
          
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
          
                .header {
                  background-color: #0101b5;
                  padding: 5px;
                  text-align: center;
                }
          
                .header h1 {
                  color: #fff;
                  font-size: medium;
                  margin: 0;
                }
          
                .invoice-details {
                  margin-top: 20px;
                }
          
                .invoice-details p {
                  margin: 0;
                }
          
                .logo {
                  text-align: right;
                }
          
                .logo img {
                  max-width: 200px;
                }
          
                .invoice-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
          
                .invoice-table th,
                .invoice-table td {
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: center;
                }
          
                .invoice-table th {
                  background-color: #f1f1f1;
                }
          
                .warning {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .warning p {
                  margin: 0;
                }
          
                .att {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .att p {
                  margin: 0;
                }
          
                .att a {
                  text-decoration: none;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>¡SE HA TRASLADADO UNA SOLICITUD DE CRÉDITO A TU ÁREA!</h1>
                </div>

                <p>Antes de realizar cualquier acción, verifica la información sumistrada.</p>

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.paqueteCreditoUrl}/${token}</b>                  
                </div>
                <div class="att">
                  <p>Cordialmente,</p>
                  <p>
                    FODEGRAN<br>
                    Línea de atención +57 324 2559322 <br>
                    email asistentefodegran@gmail.com <br>
                    Calle 13 #32-417 Bodega 4 Acopi - Yumbo, Valle <br> 
                  </p>
                </div>
          
                <div class="footer">
                  <p><u>Aviso Legal</u></p>
                  <p>
                    SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
                    DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
                    SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
                    AGRADECEMOS NOS INFORME AL RESPECTO. El contenido de este mensaje de
                    correo electrónico y todos los archivos adjuntos a éste contienen
                    información de carácter confidencial y/o uso privativo de FODEGRAN
                    y de sus destinatarios. Si usted recibió este mensaje
                    por error, por favor elimínelo y comuníquese con el remitente para
                    informarle de este hecho, absteniéndose de divulgar o hacer cualquier
                    copia de la información ahí contenida, gracias. En caso contrario
                    podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
                  </p>
                </div>
              </div>
            </body>
          </html>
          
          `}
          transporter.sendMail(mensaje,(error,info)=> {
            if(error){
              res.json({
                error,
              });
            } else {
              res.json({
                info,
              });
              console.log('Correo enviado a:'+info.response)
            }
          })     
    res.status(200)
    } catch (error) {
    console.log(error);
    next(error)
  }
};

const secondMailComite = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret)

    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
          port: config.smtpPort,
          secure: true,
          auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
          }
      });
      const mensaje={
          from: config.smtpEmail,
          to: 'sistemas2@granlangostino.net',
          subject: "¡NUEVA SOLICITUD DE CREDITO!",
          html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap"
                rel="stylesheet"
              />
              <title>SOLICITUD DE CREDITO</title>
              <style>
                body {
                  font-family: Arial, sans-serif;;
                  line-height: 1.5;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
          
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
          
                .header {
                  background-color: #0101b5;
                  padding: 5px;
                  text-align: center;
                }
          
                .header h1 {
                  color: #fff;
                  font-size: medium;
                  margin: 0;
                }
          
                .invoice-details {
                  margin-top: 20px;
                }
          
                .invoice-details p {
                  margin: 0;
                }
          
                .logo {
                  text-align: right;
                }
          
                .logo img {
                  max-width: 200px;
                }
          
                .invoice-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
          
                .invoice-table th,
                .invoice-table td {
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: center;
                }
          
                .invoice-table th {
                  background-color: #f1f1f1;
                }
          
                .warning {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .warning p {
                  margin: 0;
                }
          
                .att {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .att p {
                  margin: 0;
                }
          
                .att a {
                  text-decoration: none;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>¡SE HA TRASLADADO UNA SOLICITUD DE CRÉDITO A TU ÁREA!</h1>
                </div>

                <p>Antes de realizar cualquier acción, verifica la información sumistrada.</p>

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.paqueteCreditoUrl}/${token}</b>                  
                </div>
                <div class="att">
                  <p>Cordialmente,</p>
                  <p>
                    FODEGRAN<br>
                    Línea de atención +57 324 2559322 <br>
                    email asistentefodegran@gmail.com <br>
                    Calle 13 #32-417 Bodega 4 Acopi - Yumbo, Valle <br> 
                  </p>
                </div>
          
                <div class="footer">
                  <p><u>Aviso Legal</u></p>
                  <p>
                    SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
                    DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
                    SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
                    AGRADECEMOS NOS INFORME AL RESPECTO. El contenido de este mensaje de
                    correo electrónico y todos los archivos adjuntos a éste contienen
                    información de carácter confidencial y/o uso privativo de FODEGRAN
                    y de sus destinatarios. Si usted recibió este mensaje
                    por error, por favor elimínelo y comuníquese con el remitente para
                    informarle de este hecho, absteniéndose de divulgar o hacer cualquier
                    copia de la información ahí contenida, gracias. En caso contrario
                    podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
                  </p>
                </div>
              </div>
            </body>
          </html>
          
          `}
          transporter.sendMail(mensaje,(error,info)=> {
            if(error){
              res.json({
                error,
              });
            } else {
              res.json({
                info,
              });
              console.log('Correo enviado a:'+info.response)
            }
          })     
    res.status(200)
    } catch (error) {
    console.log(error);
    next(error)
  }
};

const verifyToken = async (req, res, next) =>{
  try{
    const { params: { token }} = req
    
    jwt.verify(token, config.jwtSecret, async (err, decoded) =>{
      if (err) {
        return res.status(500).json({ message: "Token inválido o expirado" });
      }else{
        
        const data = await EstudioCreditoService.findOne(decoded.id)
        
        res.status(200).json({
            message:'Token válido',
            data
        })
      }
    })
  } catch(error){
    console.log(error)
      next(error)
  }
}

const duoVerify = async (req, res, next) =>{
  try{

    const { params: { token }} = req
    
    jwt.verify(token, config.jwtSecret, async (err, decoded) =>{
      if (err) {
        return res.status(500).json({ message: "Token inválido o expirado" });
      }else{
        console.log(`${decoded.id}`)

        const data = await EstudioCreditoService.findOne(decoded.id)

        res.status(200).json({
            message:'Token válido',
            data
        })
      }
    })
  } catch(error){
    console.log(error)
      next(error)
  }
}

module.exports = {
    findAllEstudioCreditos,
    findOneEstudioCredito,
    findEstudioWithCredito,
    findOneByCredito,
    createEstudioCredito,
    updateEstudioCredito,
    verifyToken,
    duoVerify,
    deleteEstudioCredito,
    mailAuxiliar,
    mailComite,
    secondMailComite,
}