import { Router } from 'express'
import { exec } from 'child_process'
import compression from 'compression'


const routerInfo = Router()

// console.log(process.argv)
// console.log(process.env)

// console.log('process.platform:',process.platform)
// console.log('process.memoryUsage():',process.memoryUsage())
// console.log('process.pid:',process.pid)
// console.log('process.cwd():',process.cwd())

let version
exec('node -v', (err, stdout, stderr) => { 
    if(err){
        console.log(err)
        return
    }
    if(stderr){
        console.log(stderr)
        return
    }
    version = stdout.replace('\n','')
    // console.log(stdout)
})


routerInfo.get('/', compression(), (req, res) => {
    const info = {
        Argumentos_Entrada: process.argv,
        Path_Ejecucion: process.env.PWD,
        Nombre_Plataforma: process.env.OS,
        Process_Id: process.pid,
        Version_Node: version,
        Carpeta_Proyecto: process.cwd(),
        Memoria_Total_Reservada: process.memoryUsage(),
    }
    // console.log(info);
    res.json({ info })
})

export default routerInfo