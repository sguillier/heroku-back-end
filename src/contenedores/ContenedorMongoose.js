import mongoose from 'mongoose'
import config from './configContenedores.js'

await mongoose.connect(config.mongoose.stringConexion, config.mongoose.options)


class ContenedorMongoose {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }


    getAll = async () => {
        // Empezamos con array vacio
        let arrayItems = []

        // Obtenemos array con objetos "sucios" desde mongoDB
        const items = await this.coleccion.find({})

        //Recorremos datos "sucios"
        items.forEach(e => {
            // Metodo "artesanal" para darle un formato legible, sin esto no puedo acceder a '_id' y '__v' entre otros errores.
            const item = JSON.parse(JSON.stringify(e))

            // eliminamos '_id' y '__v' 
            delete item['_id']
            delete item['__v']

            // Acumulamos resultados "limpios" en arrayItems
            arrayItems.push(item)
        });

        // Devolvemos array con datos "limpios"
        return arrayItems
    }


    getById = async (id) => {
        // Obtenemos objeto "sucio" por id desde mongoDB
        let item = await this.coleccion.findOne({ id: id })

        // Si existe objeto lo "limpiamos", si no retornamos null
        if (item) {
            // Metodo "artesanal" para darle un formato legible, sin esto no puedo acceder a '_id' y '__v' entre otros errores.
            item = JSON.parse(JSON.stringify(item))

            // eliminamos '_id' y '__v' 
            delete item['_id']
            delete item['__v']

            // Retornamos objeto "limpio"
            return item
        } else {
            return null
        }
    }


    save = async (item) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()

        // Definimos nuevo Id
        const Ids = arrayItems.map(e => e.id)
        const nuevoId = Math.max(...Ids, 0) + 1
        
        // Construimos Nuevo Item
        const nuevoItem = { id: nuevoId, ...item }

        // Incluimos el nuevo item en base de datos
        await this.coleccion.create(nuevoItem)

        // Devolvemos el nuevo Id
        return nuevoId
    }


    deleteById = async (id) => {
        // Eliminamos el item directamente de la base
        await this.coleccion.deleteOne({ id: id })

        // Devolvemos nada
    }


    // Incluida en V1 proyecto final
    saveById = async (id, nuevoItem) => {
        // Eliminamos el item de la base si es que existe
        await this.coleccion.deleteOne({ id: id })
        
        // Creamos en la base nuevo item
        await this.coleccion.create({ id: id, ...nuevoItem })

        // Devolvemos el nada
    }


    deleteAll = async () => {
        await this.coleccion.deleteMany({})

        // Devolvemos nada
    }


}

export default ContenedorMongoose

