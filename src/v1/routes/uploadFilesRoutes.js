const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const fsExtra = require('fs-extra');
const { execSync } = require('child_process');
const { promisify } = require('util');
const { convert } = require("pdf-poppler");
const { format } = require('date-fns');
const { PDFDocument: PDFLibDocument } = require('pdf-lib');

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Carpeta para guardar los archivos subidos temporalmente

router.post('/', upload.fields([
    { name: 'simuladorCredito' },
    { name: 'relacionCuentas' }
]),async (req, res) =>{
        
        const { simuladorCredito, relacionCuentas } = req.files;

        if (!simuladorCredito || !relacionCuentas) {
            return res.status(400).json({ error: 'Ambos archivos son obligatorios.' });
        }

        // Obtener la fecha actual en formato YYYY-MM-DD
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const name = req.body.clientName;
        const folder = `${currentDate}_${name}`;
        
        /* const folderPath = path.join(`C:/solicitud/${folder}`); */
        const folderPath = path.join(`C:/solicitud/${folder}`);

        const convertToPDF = (file, outputName, folderPath) => {
            const outputPath = path.join(folderPath, outputName);
        
            return new Promise(async (resolve, reject) => {
                try {
                    const fileBuffer = fs.readFileSync(file.path);
                    const doc = new PDFDocument();
                    const writeStream = fs.createWriteStream(outputPath);
                    doc.pipe(writeStream);
        
                    if (file.mimetype.startsWith('text/')) {
                        // Procesar texto
                        const fileContent = fileBuffer.toString('utf-8');
                        doc.text(fileContent); // Escribir texto en el PDF
                    } else if (file.mimetype.startsWith('image/')) {
                        // Procesar imagen
                        const tempImagePath = path.join(folderPath, 'temp_image');
                        fs.writeFileSync(tempImagePath, fileBuffer);
                        doc.image(tempImagePath, {
                            fit: [500, 500],
                            align: 'center',
                            valign: 'center',
                        });
                        fs.unlinkSync(tempImagePath); // Eliminar imagen temporal
                    } else if (file.mimetype === 'application/pdf') {
                        // Procesar PDF usando pdf-lib
                        const existingPDF = await PDFLibDocument.load(fileBuffer);
                        const newPDF = await PDFLibDocument.create();

                        const pages = await newPDF.copyPages(
                            existingPDF,
                            existingPDF.getPageIndices()
                        );

                        pages.forEach((page) => {
                            newPDF.addPage(page);
                        });

                        const mergedPDFBytes = await newPDF.save();
                        fs.writeFileSync(outputPath, mergedPDFBytes);

                        resolve(outputPath);
                        return; // Salir aquí ya que el PDF ya está procesado
                    } else {
                        reject(new Error(`Tipo de archivo no compatible: ${file.mimetype}`));
                        return;
                    }
        
                    doc.end();
        
                    writeStream.on('finish', () => resolve(outputPath));
                    writeStream.on('error', reject);
                } catch (error) {
                    reject(error);
                }
            });
        };

        async function crearCarpetaLocal(){
            try {
                
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                // Convertir archivos a PDF
                const simuladorPDF = await convertToPDF(simuladorCredito[0], 'simulador_credito.pdf', folderPath);
                console.log(`simulador guardado: ${simuladorPDF}`)

                const relacionPDF = await convertToPDF(relacionCuentas[0], 'relacion_cuentas_y_terceros.pdf', folderPath);
                console.log(`relacion guardado: ${relacionPDF}`)

                // Crear rutas completas para los archivos PDF
                const simuladorPath = path.join(folderPath, 'simulador_credito.pdf');
                const relacionPath = path.join(folderPath, 'relacion_cuentas_y_terceros.pdf');

            } catch (error) {
                console.error('Error al crear la carpeta local:', error.message);
                process.exit(1);
            }
        }
        
        // Ruta local de la carpeta que deseas enviar
        const carpetaLocal = folderPath

        // Ruta del recurso compartido en formato UNC (Uniform Naming Convention)
        const rutaRecursoCompartido = '\\\\192.168.4.237\\aplicativoFodegran';

        // Ruta remota en el recurso compartido donde deseas guardar la carpeta
        const rutaRemota = `${rutaRecursoCompartido}\\${folder}`;
        
        async function carpetaRemota(){
            try {
                if(!fs.existsSync(rutaRemota)){
                    execSync(`mkdir "${rutaRemota}"`);
                }

                const archivosLocales = fs.readdirSync(carpetaLocal);

                await archivosLocales.forEach((archivo) => {
                    const rutaLocal = path.join(carpetaLocal, archivo);
                    const rutaRemotaArchivo = path.join(rutaRemota, archivo);
                
                    // Utiliza un comando del sistema operativo para copiar el archivo al recurso compartido
                    execSync(`copy "${rutaLocal}" "${rutaRemotaArchivo}"`);
                    try {
                    console.log(`Archivo ${archivo} enviado correctamente.`);
                    } catch (error) {
                    console.error(`Error al enviar el archivo ${archivo}:`, error.message);
                    }
                });
            } catch (error) {
                console.error('Error al crear la carpeta remota:', error.message);
                process.exit(1);
            }
        }

        async function vaciarCarpeta(carpeta) {
            try {
                // Leer los contenidos de la carpeta
                const archivos = fs.readdirSync(carpeta);
        
                for (const archivo of archivos) {
                    const archivoPath = path.join(carpeta, archivo);
                    
                    // Verificar si es una subcarpeta
                    if (fs.lstatSync(archivoPath).isDirectory()) {
                        // Llamar recursivamente a la función para vaciar la subcarpeta
                        /* await vaciarCarpeta(archivoPath)
                        fs.rmdir(archivoPath); */
                        
                        // Después de vaciar la subcarpeta, eliminarla
                        console.log(`Es una carpeta`);
                    } else {
                        // Si es un archivo, eliminarlo
                        fs.unlinkSync(archivoPath);
                        console.log(`Archivo eliminado: ${archivoPath}`);
                    }
                }
        
                console.log('La carpeta ha sido vaciada completamente.');
            } catch (error) {
                console.error('Error al vaciar la carpeta:', error.message);
            }
        }

        //de esta manera controlamos la ejecucion de las funciones
        async function ejecutar(){
            console.log('Inicio de ejecucion')
            await crearCarpetaLocal();
            console.log('carpeta local creada')
            await carpetaRemota();
            console.log('carpeta remota creada')
            await vaciarCarpeta('uploads/');
            console.log('Carpeta uploads vaciada')
        }
        try{
            const data = ejecutar()

            .then(()=>{
                res.status(201).json({
                    message: 'send',
                    data
                })
            })
            .catch(()=>{
                res.status(500).json({
                    message: 'error',
                    error
                })
            })

        }catch{
            res.status(500).json({
                message: 'error',
                error
            })
        }
        console.log('Carpeta enviada correctamente.');

})

router.get('/obtener-archivo/:carpeta/:archivo', (req, res) => {
    const { carpeta, archivo } = req.params;
    const rutaArchivo = path.join('\\\\192.168.4.237\\aplicativoFodegran\\', carpeta, archivo);
    res.sendFile(rutaArchivo);
});

router.get('/pdf/:carpeta/:archivo', async (req, res) => {
    const { carpeta, archivo } = req.params;
    const outputDir = "converted"; // Carpeta para guardar imágenes
    const rutaArchivo = path.join('\\\\192.168.4.237\\aplicativoFodegran\\', carpeta, archivo);
    const opts = {
        format: "png", // Formato de salida
        out_dir: outputDir, // Directorio de salida
        out_prefix: path.parse(archivo).name, // Prefijo de archivo
        page: null, // Convertir todas las páginas
    };
    const result = await convert(rutaArchivo, opts);

    res.sendFile(result);
});

router.post('/send/comprobante', upload.fields([
    { name: 'comprobantePago' },
    { name: 'solicitud' },
    { name: 'estudio' },
]),async (req, res) =>{
        
        const { comprobantePago , solicitud , estudio } = req.files;

        if (!comprobantePago) {
            return res.status(400).json({ error: 'El archivo es obligatorio.' });
        }

        const name = req.body.clientName;
        const date = req.body.clientCreatedAt;
        const folder = `${date}_${name}`;
        
        /* const folderPath = path.join(`C:/solicitud/${folder}`); */
        const folderPath = path.join(`C:/solicitud/${folder}`);

        const convertToPDF = (file, outputName, folderPath) => {
            const outputPath = path.join(folderPath, outputName);
        
            return new Promise(async (resolve, reject) => {
                try {
                    const fileBuffer = fs.readFileSync(file.path);
                    const doc = new PDFDocument();
                    const writeStream = fs.createWriteStream(outputPath);
                    doc.pipe(writeStream);
        
                    if (file.mimetype.startsWith('text/')) {
                        // Procesar texto
                        const fileContent = fileBuffer.toString('utf-8');
                        doc.text(fileContent); // Escribir texto en el PDF
                    } else if (file.mimetype.startsWith('image/')) {
                        // Procesar imagen
                        const tempImagePath = path.join(folderPath, 'temp_image');
                        fs.writeFileSync(tempImagePath, fileBuffer);
                        doc.image(tempImagePath, {
                            fit: [500, 500],
                            align: 'center',
                            valign: 'center',
                        });
                        fs.unlinkSync(tempImagePath); // Eliminar imagen temporal
                    } else if (file.mimetype === 'application/pdf') {
                        // Procesar PDF usando pdf-lib
                        const existingPDF = await PDFLibDocument.load(fileBuffer);
                        const newPDF = await PDFLibDocument.create();

                        const pages = await newPDF.copyPages(
                            existingPDF,
                            existingPDF.getPageIndices()
                        );

                        pages.forEach((page) => {
                            newPDF.addPage(page);
                        });

                        const mergedPDFBytes = await newPDF.save();
                        fs.writeFileSync(outputPath, mergedPDFBytes);

                        resolve(outputPath);
                        return; // Salir aquí ya que el PDF ya está procesado
                    } else {
                        reject(new Error(`Tipo de archivo no compatible: ${file.mimetype}`));
                        return;
                    }
        
                    doc.end();
        
                    writeStream.on('finish', () => resolve(outputPath));
                    writeStream.on('error', reject);
                } catch (error) {
                    reject(error);
                }
            });
        };

        async function crearCarpetaLocal(){
            try {
                
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                // Convertir archivos a PDF
                const comprobantePDF = await convertToPDF(comprobantePago[0], 'comprobante_desembolso.pdf', folderPath);
                console.log(`comprobante guardado: ${comprobantePDF}`)

                const solicitudPDF = await convertToPDF(solicitud[0], 'solicitud_credito.pdf', folderPath);
                console.log(`solicitud guardado: ${solicitudPDF}`)

                const estudioPDF = await convertToPDF(estudio[0], 'estudio_credito.pdf', folderPath);
                console.log(`estudio guardado: ${estudioPDF}`)

                // Crear rutas completas para los archivos PDF
                const comprobantePath = path.join(folderPath, 'comprobante_desembolso.pdf');
                const solicitudPath = path.join(folderPath, 'solicitud_credito.pdf');
                const estudioPath = path.join(folderPath, 'estudio_credito.pdf');

            } catch (error) {
                console.error('Error al crear la carpeta local:', error.message);
                process.exit(1);
            }
        }
        
        // Ruta local de la carpeta que deseas enviar
        const carpetaLocal = folderPath

        // Ruta del recurso compartido en formato UNC (Uniform Naming Convention)
        const rutaRecursoCompartido = '\\\\192.168.4.237\\aplicativoFodegran';

        // Ruta remota en el recurso compartido donde deseas guardar la carpeta
        const rutaRemota = `${rutaRecursoCompartido}\\${folder}`;
        
        async function carpetaRemota(){
            try {
                if(!fs.existsSync(rutaRemota)){
                    execSync(`mkdir "${rutaRemota}"`);
                }

                const archivosLocales = fs.readdirSync(carpetaLocal);

                await archivosLocales.forEach((archivo) => {
                    const rutaLocal = path.join(carpetaLocal, archivo);
                    const rutaRemotaArchivo = path.join(rutaRemota, archivo);
                
                    // Utiliza un comando del sistema operativo para copiar el archivo al recurso compartido
                    execSync(`copy "${rutaLocal}" "${rutaRemotaArchivo}"`);
                    try {
                    console.log(`Archivo ${archivo} enviado correctamente.`);
                    } catch (error) {
                    console.error(`Error al enviar el archivo ${archivo}:`, error.message);
                    }
                });
            } catch (error) {
                console.error('Error al crear la carpeta remota:', error.message);
                process.exit(1);
            }
        }

        async function vaciarCarpeta(carpeta) {
            try {
                // Leer los contenidos de la carpeta
                const archivos = fs.readdirSync(carpeta);
        
                for (const archivo of archivos) {
                    const archivoPath = path.join(carpeta, archivo);
                    
                    // Verificar si es una subcarpeta
                    if (fs.lstatSync(archivoPath).isDirectory()) {
                        // Llamar recursivamente a la función para vaciar la subcarpeta
                        /* await vaciarCarpeta(archivoPath)
                        fs.rmdir(archivoPath); */
                        
                        // Después de vaciar la subcarpeta, eliminarla
                        console.log(`Es una carpeta`);
                    } else {
                        // Si es un archivo, eliminarlo
                        fs.unlinkSync(archivoPath);
                        console.log(`Archivo eliminado: ${archivoPath}`);
                    }
                }
        
                console.log('La carpeta ha sido vaciada completamente.');
            } catch (error) {
                console.error('Error al vaciar la carpeta:', error.message);
            }
        }

        //de esta manera controlamos la ejecucion de las funciones
        async function ejecutar(){
            console.log('Inicio de ejecucion')
            await crearCarpetaLocal();
            console.log('carpeta local creada')
            await carpetaRemota();
            console.log('carpeta remota creada')
            await vaciarCarpeta('uploads/');
            console.log('Carpeta uploads vaciada')
        }
        try{
            const data = ejecutar()

            .then(()=>{
                res.status(201).json({
                    message: 'send',
                    data
                })
            })
            .catch(()=>{
                res.status(500).json({
                    message: 'error',
                    error
                })
            })

        }catch{
            res.status(500).json({
                message: 'error',
                error
            })
        }
        console.log('Carpeta enviada correctamente.');

})

/* 
// Servir las imágenes generadas
router.use(`/${outputDir}`, express.static(path.join(__dirname, outputDir))); */

module.exports = router