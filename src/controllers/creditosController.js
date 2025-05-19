const CreditoService = require('../services/creditosService');
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

const findAllCreditos = async (req, res, next) => {
    try {
      const data = await CreditoService.find();
      
      res.status(200).json({
        message: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
};

const findOneCredito = async (req, res, next) => {
    try {
      const { params:{id}} = req
      const data = await CreditoService.findOne(id)
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
}

const findOneByCedula = async (req, res, next) => {
  try {
    const { params:{cedula}} = req
    const data = await CreditoService.findByCedula(cedula)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const createCredito = async (req, res, next) => {
    try {
      const {body} = req

      const data = await CreditoService.create(body)
  
      res.status(201).json({
        message: 'Created',
        data
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
}

const updateCredito =async (req, res, next) => {
    try {
      const { body, params: { id } } = req
      const data = await CreditoService.update(id, body)
  
      res.status(200).json({
        message: 'Updated',
        data
      })
    } catch (error) {
      next(error)
    }
}

const addSignature =async (req, res, next) => {
  try {
    const { body, params: { token } } = req

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
      if (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }else{
        const data = await CreditoService.update(body.id, body)
        
        res.status(200).json({
          message: 'Updated',
          data
        })
      }
    })

  } catch (error) {
    next(error)
  }
}

const deleteCredito = async(req,res,next)=>{
  try{
      const {params:{id}}=req
      /* console.log(id) */
      const data = await CreditoService.remove(id)
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
          to: config.smtpEmail,
          cc: 'sistemas2@granlangostino.net',
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
              <title>NUEVA SOLICITUD DE CREDITO</title>
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
                  <h1>¡SE HA GENERADO UNA NUEVA SOLICITUD!</h1>
                </div>
                <p>Se ha generado una nueva solicitud de crédito a nombre de: ${body.nombre}, con número de identificación: ${body.cedula}</p>
          
                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.requestUrl}</b>                  
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

const mailSolicitante = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload,config.jwtSecret,{ expiresIn: "24h" })

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
          to: body.correo,
          subject: "¡SOLICITUD DE CREDITO!",
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
                  <h1>¡HAS SOLICITADO UN CREDITO!</h1>
                </div>
                <p>Para completar la solicitud debes firmar electrónicamente a través del siguiente enlace.</p>
                <b>NOTA:</b>
                <p>Antes de cualquier accíon verifica la información que aparecerá en pantalla; Tienes 30 minutos para realizar la firma del documento, en caso que sobre pases el tiempo, deberas volver a solicitar el prestamo.</p>

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.creditoUrl}/${token}</b>                  
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

const mailEstudioCredito = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret ,{ expiresIn: "7d" })

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
                  <h1>¡SE HA CREADO UNA NUEVA SOLICITAD DE CREDITO!</h1>
                </div>

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.estudioCreditoUrl}/${token}</b>                  
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

const mailPresidente = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" })

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

const mailGerencia = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" })

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

const mailTesoreria = async (req, res, next) => {
  try {
    const { body } = req

    const payload = {
      id: body.id
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" })

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

                <div class="warning">
                  <b>Para visualizar la información Ingresa aquí ${config.paqueteTesoreriaUrl}/${token}</b>                  
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

const mailFinalizado = async (req, res, next) => {
  try {
    const { body } = req

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
          subject: "¡SOLICITUD DE CREDITO FINALIZADA!",
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
              <title>SOLICITUD DE CREDITO FINALIZADA</title>
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
                  background-color: 'green';
                  padding: 5px;
                  text-align: center;
                }

                .especificaciones {
                  text-align: center;
                  align-items: center;
                  display: 'flex';
                  width: 100%;
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
                  <h1>¡SE HA FINALIZADO LA SOLICITUD DE CRÉDITO!</h1>
                </div>
                <hr/>
                <b class="especificaciones">Especificaciones del crédito </b>
                <p><b>Nombre:</b> ${body.nombre}.</p>
                <p><b>Número de Cédula:</b> ${body.rowId}.</p>
                <p><b>Entidad bancaria:</b> ${body.entidadBancaria}.</p>
                <p><b>Tipo de cuenta:</b> ${body.tipoCuenta}.</p>
                <p><b>Número de cuenta:</b> ${body.cuentaBancaria}.</p>
                <p><b>Monto desembolsado: $</b> ${Number(body.valorSolicitado).toLocaleString('es')}
                <p><b>Fecha de desembolso:</b> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}.</p>
                
                <p>Se hace desembolso del dinero solicitado; por favor antes de cualquier acción verificar la información sumistrada.</p>
                <p>Cualquier duda, queja o solicitud, comunicarse con la auxiliar del fondo de empleados del gran langostino al número de celular: +57 324 2559322 ó por correo electrónico: asistentefodegran@gmail.com.</p>

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
        return res.status(401).json({ message: "Token inválido o expirado" });
      }else{
        
        const data = await CreditoService.findOne(decoded.id)

        if(data.firmaAsociado === '' || data.firmaAsociado === null){
          res.status(200).json({
              message:'Token válido',
              data
          })
        }else{
          res.status(401).json({ message: "Token ya utilizado" });
        }
      }
    })
  } catch(error){
    console.log(error)
      next(error)
  }
}

const verifyTokenWithId = async (req, res, next) =>{
  try{
    const { params: { token }} = req
    
    jwt.verify(token, config.jwtSecret, async (err, decoded) =>{
      if (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }else{
        
        const data = await CreditoService.findOne(decoded.id)

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

const mailRejectComite = async (req, res, next) => {
  try {
    const { body } = req

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
          /* cc: '', */
          subject: "¡RECHAZO DE SOLICITUD DE CRÉDITO!",
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
              <title>SOLICITUD DE CREDITO RECHAZADA</title>
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
                  background-color: 'red';
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
                  <h1>¡SE HA RECHAZADO LA SOLICITUD DE CRÉDITO!</h1>
                </div>
                <hr/>
                <b class="especificaciones">Especificaciones del crédito rechazado </b>
                <p><b>Nombre del solicitante:</b> ${body.suggestions.credito.nombre}.</p>
                <p><b>Número de Cédula del solicitante:</b> ${body.suggestions.credito.rowId}.</p>
                <p><b>Valor solicitado: $</b> ${body.suggestions.credito.valorSolicitado}.</p>
                <p><b>Rechazado por:</b> ${body.user}.</p>
                <p><b>Motivo:</b> ${body.motivo}.</p>
                <p><b>Fecha de rechazo:</b> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}.</p>

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

const mailRejectGerencia = async (req, res, next) => {
  try {
    const { body } = req

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
          /* cc: '', */
          subject: "¡RECHAZO DE SOLICITUD DE CRÉDITO!",
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
              <title>SOLICITUD DE CREDITO RECHAZADA</title>
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
                  background-color: 'red';
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
                  <h1>¡SE HA RECHAZADO LA SOLICITUD DE CRÉDITO!</h1>
                </div>
                <hr/>
                <b class="especificaciones">Especificaciones del crédito rechazado </b>
                <p><b>Nombre del solicitante:</b> ${body.suggestions.credito.nombre}.</p>
                <p><b>Número de Cédula del solicitante:</b> ${body.suggestions.credito.rowId}.</p>
                <p><b>Valor solicitado: $</b> ${body.suggestions.credito.valorSolicitado}.</p>
                <p><b>Rechazado por:</b> ${body.user}.</p>
                <p><b>Motivo:</b> ${body.motivo}.</p>
                <p><b>Fecha de rechazo:</b> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}.</p>

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

module.exports = {
    findAllCreditos,
    findOneCredito,
    findOneByCedula,
    createCredito,
    updateCredito,
    addSignature,
    verifyToken,
    verifyTokenWithId,
    deleteCredito,
    mailAuxiliar,
    mailSolicitante,
    mailEstudioCredito,
    mailPresidente,
    mailGerencia,
    mailTesoreria,
    mailFinalizado,
    mailRejectComite,
    mailRejectGerencia,
}