
import getColeccion from "./index.js"
const coleccionProductos =  await getColeccion('productos')

class claseProductos {

    constructor() {
        this.productos = coleccionProductos
    }

    getAllProducts = async () => {
        return await this.productos.getAll()
    }

    getProductById = async (id) => {
        return await this.productos.getById(id)
    }

    saveProduct = async (item) => {
        return await this.productos.save(item)
    }

    saveProductById = async (id, item) => {
        return await this.productos.saveById(id, item)
    }
    
    deleteProductById = async (id) => {
        return await this.productos.deleteById(id)
    }

    deleteAllProducts = async () => {
        return await this.productos.deleteAll()
    }

}

export default claseProductos