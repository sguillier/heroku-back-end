
import getColeccion from "./index.js"
const coleccionMensajes =  await getColeccion('mensajes')

class claseMensajes {

    constructor() {
        this.mensajes = coleccionMensajes
    }

    getAllMessages = async () => {
        return await this.mensajes.getAll()
    }

    getMessageById = async (id) => {
        return await this.mensajes.getById(id)
    }

    saveMessage = async (item) => {
        return await this.mensajes.save(item)
    }

    saveMessageById = async (id, item) => {
        return await this.mensajes.saveById(id, item)
    }
    
    deleteMessageById = async (id) => {
        return await this.mensajes.deleteById(id)
    }

    deleteAllMessages = async () => {
        return await this.mensajes.deleteAll()
    }

}

export default claseMensajes