const CreditoService = require('../services/creditosService');
const { config } = require("../config/config");
const nodemailer = require("nodemailer")

const findAllCreditos = async (req, res, next) => {
    try {
      const data = await CreditoService.find();
      
      /* console.log(data) */
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

const createCredito = async (req, res, next) => {
    try {
      const {body} = req
      /* console.log(body) */

      const data = await CreditoService.create({
        rowId:body.cedula,
        nombre:body.nombre,
        correo:body.correo,
        tipoCredito: body.TipoCredito,
        cantidad: body.cantidad,
        plazo: body.plazo,
        estado: body.estado,
        createdAt: body.createdAt
      })
  
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
                    EL GRAN LANGOSTINO S.A.S <br>
                    Línea Nacional 018000 180133 <br>
                    Calle 13 #32-417 Bodega 4 Acopi - Yumbo, Valle <br> 
                    <a href="https://tienda.granlangostino.com/">www.granlangostino.com</a>
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
                    información de carácter confidencial y/o uso privativo de EL GRAN
                    LANGOSTINO S.A.S y de sus destinatarios. Si usted recibió este mensaje
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
    createCredito,
    updateCredito,
    deleteCredito,
    mailAuxiliar,
}