
import config from './configContenedores.js'
import { promises as fs } from 'fs'


class ContenedorArchivo {
    constructor(fileName) {
        this.rutaArchivo = config.txt.path + fileName
    }


    getAll = async () => {
        try{
            // Extraemos info de archivo.txt y lo convertimos en array
            const file = await fs.readFile(this.rutaArchivo, 'utf-8')
            const arrayItems = JSON.parse(file)
            
            // Devolvemos el array
            return arrayItems
        } catch(err){
            // Creamos el archivo si no existe
            await fs.writeFile(this.rutaArchivo, '[]')
            const file = await fs.readFile(this.rutaArchivo, 'utf-8')
            const arrayItems = JSON.parse(file)
            
            // Devolvemos el array
            return arrayItems
        }
    }
    

    getById = async (id) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Obtenemos el elemento del array con id solicitado
        const item = arrayItems.find(e => e.id === id)
        
        // Devolvemos el objeto si existe si no null
        return item ? item : null
    }


    save = async (item) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Definimos nuevo Id
        const Ids = arrayItems.map(e => e.id)
        const nuevoId = Math.max(...Ids, 0) + 1
        
        // Construimos Nuevo Item
        const nuevoItem = { id: nuevoId, ...item }
        
        // Incluimos el nuevo item en array
        arrayItems.push({id:nuevoId, ...nuevoItem})

        //Volcamos el array en archivo
        const arrayJSON = JSON.stringify(arrayItems, null, 2)
        await fs.writeFile(this.rutaArchivo, arrayJSON)

        // Devolvemos el nuevo Id
        return nuevoId
    }


    deleteById = async (id) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Eliminamos el item del array
        const newArrayItems = arrayItems.filter(e => e.id !== id)

        //Volcamos el array en archivo
        const arrayJSON = JSON.stringify(newArrayItems, null, 2)
        await fs.writeFile(this.rutaArchivo, arrayJSON)

        // Devolvemos nada
    }


    // Incluida en V1 proyecto final
    saveById = async (id, nuevoItem) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()

        // Eliminamos item con ese id
        const newArrayItems = arrayItems.filter(e => e.id !== id)

        // Incluimos el nuevo item en array
        newArrayItems.push({id:id, ...nuevoItem})

        //Volcamos el array en archivo
        const arrayJSON = JSON.stringify(newArrayItems, null, 2)
        await fs.writeFile(this.rutaArchivo, arrayJSON)

        // Devolvemos el nada
    }

    deleteAll = async () => {
        //Escribimos archivo vacio
        await fs.writeFile(this.rutaArchivo, '[]')

        // Devolvemos nada
    }
}

export default ContenedorArchivo




