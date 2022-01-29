
import winston from 'winston';
import fs from 'fs';

const warnsFile = './src/logger/warns.log'
const errorsFile = './src/logger/errors.log'

fs.writeFileSync(warnsFile, '')
fs.writeFileSync(errorsFile, '')


const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({level:'info'}),
        new winston.transports.Console({level:'warn'}),
        new winston.transports.Console({level:'error'}),
        new winston.transports.File({ filename: warnsFile, level:'warn' }),
        new winston.transports.File({ filename: errorsFile, level:'error' }),
    ]
})

logger.middlewareInfo = (req, res, next) => {
    // console.log(`Metodo:${req.method} /  Ruta:${req.path}`);
    // console.log(`Metodo:${req.method} /  Ruta:${req.baseUrl}`);
    // console.log(`Metodo:${req.method} /  Ruta:${req.originalUrl}`);
    // console.log(`Metodo:${req.method} /  Ruta:${req.url}`);
    
    logger.info(`[Peticion Correcta] Metodo:${req.method} / Ruta:${req.originalUrl}`);
    next()
}

logger.middlewareWarn = (req, res, next) => {    
    logger.warn(`[Peticion Ruta Inexistente] Metodo:${req.method} / Ruta:${req.originalUrl}`);
    next()
}



export default logger;

