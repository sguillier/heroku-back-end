
import getColeccion from "./index.js"
const coleccionCarritos = await getColeccion('carritos')

class claseCarritos {

    constructor() {
        this.carritos = coleccionCarritos
    }

    getAllCarts = async () => {
        return await this.carritos.getAll()
    }

    getCartById = async (id) => {
        return await this.carritos.getById(id)
    }


    getAllProductsFromCartByCartId = async (id) => {
        const carrito = await this.carritos.getById(id)
        return carrito.productos
    }


    saveCart = async (item) => {
        return await this.carritos.save(item)
    }

    saveCartById = async (id, item) => {
        return await this.carritos.saveById(id, item)
    }


    addProductsToCartByCartId = async (id, newProductos) => {
        const carrito = await this.carritos.getById(id)
        carrito.productos.push(newProductos)
        return await this.carritos.saveById(id, carrito)
    }


    deleteCartById = async (id) => {
        return await this.carritos.deleteById(id)
    }

    deleteAllCarts = async () => {
        return await this.carritos.deleteAll()
    }
    
    
    deleteProductByIdFromCartByCartId = async (CartId, ProductId) => {
        let carrito = await this.carritos.getById(id)
        const newProductos = carrito.productos.filter(e => e.id !== ProductId)
        carrito.productos = newProductos

        return await this.carritos.saveById(CartId, carrito)
    }


}

export default claseCarritos