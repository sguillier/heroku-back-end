

class ContenedorMemoria {

    constructor() {
        this.arrayItems = []
    }


    getAll = async () => {
        return [...this.arrayItems]
        // return this.arrayItems
    }


    getById = async (id) => {
        // Obtenemos el elemento del array con id solicitado
        const item = this.arrayItems.find(e => e.id === id)

        // Devolvemos el objeto si existe si no null
        return item ? item : null
    }


    save = async (item) => {
        // Definimos nuevo Id
        const Ids = this.arrayItems.map(e => e.id)
        const nuevoId = Math.max(...Ids, 0) + 1

        // Construimos Nuevo Item
        const nuevoItem = { id: nuevoId, ...item }

        // Incluimos el nuevo item en array
        this.arrayItems.push(nuevoItem)

        // Devolvemos el nuevo Id
        return nuevoId
    }


    deleteById = async (id) => {
        // Eliminamos el item del array
        const newArrayItems = this.arrayItems.filter(e => e.id !== id)

        //Recomponemos arrayItems
        this.arrayItems = newArrayItems

        // Devolvemos nada
    }


    // Incluida en V1 proyecto final
    saveById = async (id, nuevoItem) => {
        // Eliminamos item con ese id
        const newArrayItems = this.arrayItems.filter(e => e.id !== id)

        // Incluimos el nuevo item en array
        newArrayItems.push({ id: id, ...nuevoItem })

        //Recomponemos arrayItems
        this.arrayItems = newArrayItems

        // Devolvemos el nada
    }


    deleteAll = async () => {
        //Escribimos archivo vacio
        this.arrayItems = []

        // Devolvemos nada
    }
}

export default ContenedorMemoria




